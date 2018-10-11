import * as React from 'react';
import { Alert, Button, Modal } from '@patternfly/react-core';
import { ClusterIcon, CodeIcon, GiftIcon } from '@patternfly/react-icons';

interface NextStepsOpenShiftProps {
  isOpen: boolean;
  error?: boolean;
  landingPageLink?: string;
  repositoryLink?: string;
  deploymentLink?: string;
  children?: React.ReactNode;
  onClose?(): void;
}

class NextStepsOpenShift extends React.Component<NextStepsOpenShiftProps, {}> {
  public render(){
    const landingPageLink = this.props.landingPageLink || 'https://fabric8-launcher.github.io/application-creator-landingpage/';
    const repositoryLink = this.props.repositoryLink || 'https://github.com/fabric8-launcher/launcher-creator-frontend';
    const deploymentLink = this.props.deploymentLink || 'https://manage.openshift.com/';
    return (
      <Modal title="Next steps..." isOpen={this.props.isOpen} onClose={this.props.onClose} actions={this.props.children} isLarge>
        {!this.props.error && (
          <React.Fragment>
            <Alert variant="success">We are delivering your new Application</Alert>
            <h2>Follow your application delivery</h2>
            <p>You can follow your application deployment in your OpenShift Console</p>
            <Button component="a" variant="link" href={deploymentLink} target={'_blank'}>
              <ClusterIcon /> OpenShift Console
            </Button>
            <h2>As soon as deployment is done, go checkout your new application capabilities</h2>
            <p>We prepared a set of examples to let you directly start playing with your new application.
              Those examples are there to get you started,
              soon it will be time for you to remove them and start developing your awesome application.</p>
            <Button component="a" variant="link" href={landingPageLink} target={'_blank'}>
              <GiftIcon /> Checkout your new Application
            </Button>
            <h2>Update your application using Continuous Delivery</h2>
            <p>We set up your application codebase in the GitHub repository you requested</p>
            <p>Your application is automatically configured to build and deploy on OpenShift with new commits.</p>
            <Button component="a" variant="link" href={repositoryLink} target={'_blank'}>
              <CodeIcon /> Go clone your new codebase
            </Button>
          </React.Fragment>
        )}
        {this.props.error && (
          <Alert variant="danger">
            Holy guacamole... something weird happened, please reload the page to try again.
          </Alert>
        )}
      </Modal>
    );
  }
}

export default NextStepsOpenShift;