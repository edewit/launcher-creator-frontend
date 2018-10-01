import * as React from 'react';
import { Component } from 'react';
import * as Patternfly from 'patternfly-react';
import Wizard from '../../../../components/wizard/index';

import { StepProps } from '../StepProps';
import { FetchedData } from '../../../states';
import SectionLoader from '../../../../components/loader/SectionLoader';
import { GitRepository } from '../../../models/GitRepository';
import GitUser from '../../../models/GitUser';
import { WizardStepId } from '../../../states/WizardState';

export interface RepositoryStepContext {
  repository?: string;
}

export interface RepositoryStepProps extends StepProps<RepositoryStepContext> {
  applicationName?: string;
  gitUserData: FetchedData<GitUser>;
  fetchGitUser: () => {};
}

class RepositoryStep extends Component<RepositoryStepProps> {

  public static defaultProps = {
    stepId: WizardStepId.REPOSITORY_STEP,
    context: {},
  };

  public componentDidMount() {
    this.props.fetchGitUser();
  }

  public componentDidUpdate() {
    if (this.props.current && !this.props.context.repository && this.props.gitUserData.data) {
      const repository = { organization: this.props.gitUserData.data.login, name: this.props.applicationName } as GitRepository;
      this.updateStepContext(repository);
    }
  }

  public render() {
    const { gitUserData } = this.props;
    const {organization, name} = RepositoryStep.toGitRepository(this.props.context.repository);
    const goToNextStep = () => this.props.goToStep(WizardStepId.DEPLOYMENT_STEP);
    return (
      <Wizard.Step
        title={'Source Code Repository'}
        summary={`➡️ Your future application source code will be in «${this.props.context.repository}»`}
        current={this.props.current}
        complete={this.props.valid}
        onClick={this.props.goToStep}
        locked={this.props.locked}
      >
        <SectionLoader loading={gitUserData.loading} error={gitUserData.error}>
          {gitUserData.data && (
            <Patternfly.TypeAheadSelect
              options={[gitUserData.data.login, ...gitUserData.data.organizations]}
              onChange={this.onOrganizationChange}
              selected={[organization]}
            />
          )}
          <input type="text" value={name} onChange={this.onNameChange}/>
        </SectionLoader>
        <Wizard.Button type={'next'} onClick={goToNextStep}/>
      </Wizard.Step>
    );
  }

  public onOrganizationChange = ([organization]: string[]) => {
    if (!organization) {
      return;
    }
    const repo = RepositoryStep.toGitRepository(this.props.context.repository);
    this.updateStepContext(RepositoryStep.toRepositoryString({ organization, name: repo.name }));
  }

  public onNameChange = (event) => {
    const name = event.target.value;
    if (!name) {
      return;
    }
    const repo = RepositoryStep.toGitRepository(this.props.context.repository);
    this.updateStepContext(RepositoryStep.toRepositoryString({ name, organization: repo.organization }));
  }

  private updateStepContext(repository) {
    this.props.updateStepContext({context: {repository: RepositoryStep.toRepositoryString(repository)}, valid: true});
  }

  private static toGitRepository(repository?: string):GitRepository {
    const [organization = '', name = ''] = repository ? repository.split('/') : [];
    return {organization, name};
  }

  private static toRepositoryString(rep: GitRepository):string {
    return `${rep.organization}/${rep.name}`;
  }
}

export default RepositoryStep;