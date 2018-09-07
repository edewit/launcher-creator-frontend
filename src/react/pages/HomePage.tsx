import * as React from 'react';
import CapabilityStep from '../components/capabilities/CapabilityStep';
import MainLayoutContainer from '../components/layout/MainLayoutContainer';
import Lizard from '../components/lizard/Lizard';
import LizardStep from '../components/lizard/LizardStep';

class HomePage extends React.Component<any, {selectedCapability: Set<string>}> {

  constructor(props) {
    super(props);
    this.state = {
      selectedCapability: new Set<string>()
    };
    this.onCapabilitySelect = this.onCapabilitySelect.bind(this);
  }

  public render() {
    return (
        <MainLayoutContainer>
          <Lizard>
            <LizardStep title={'Language & Runtime'} complete>
              Please select you language and runtime.
            </LizardStep>
            <LizardStep title={'Capabilities'} current>
              <CapabilityStep />
            </LizardStep>
            <LizardStep title={'Summary'} locked>
              Here is a summary of your future application. Launch!
            </LizardStep>
            <LizardStep title={'What\'s next...'} locked>
              Now that your application has been set up, here is what you can do...
            </LizardStep>
          </Lizard>
        </MainLayoutContainer>
    );
  }

  private onCapabilitySelect(event: string) {
    this.setState({selectedCapability: new Set(this.state.selectedCapability.add(event))})
  }
}

export default HomePage;