import * as React from 'react';
import Wizard from '../../../../shared/components/wizard';
import { StepProps } from 'src/shared/components/smart-wizard/StepProps';

export interface SwitchStepContext {
  choice?: 'custom' | 'basic';
}

interface SwitchStepState extends SwitchStepContext {
}

class SwitchStep extends React.Component<StepProps<SwitchStepContext>, SwitchStepState> {
  public static defaultProps = {
    context: { choice: undefined },
  };

  constructor(props) {
    super(props);
    const choice = this.props.context.choice;
    this.state = {
      choice,
    };
  }

  public render() {
    const submit = () => this.props.submit();
    return (
      <Wizard.Step
        title={'Basic or Custom Application'}
        summary={`➡️ Your application using «${this.props.context.choice}» configuration`}
        onClick={this.props.select}
        {...this.props.status}
      >
        <React.Fragment>
        <div onChange={this.onChange} className="radio">
          <label htmlFor="basicRadio" className="radio-inline">
            <input type="radio" value="basic" name="choice" id="basicRadio"/> Basic
          </label>
          <label htmlFor="customRadio" className="radio-inline">
            <input type="radio" value="custom" name="choice" id="customRadio"/> Custom
          </label>
        </div>
        </React.Fragment>
        <Wizard.StepFooter>
          <Wizard.Button type={'next'} onClick={submit} />
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }

  private onChange = (event) => {
    const choice = event.target.value;
    this.props.updateStepContext({context: { choice }, completed: !!choice });
  }
}

export default SwitchStep;