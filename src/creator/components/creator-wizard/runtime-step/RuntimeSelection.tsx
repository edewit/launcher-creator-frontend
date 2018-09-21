import * as React from 'react';

import * as Patternfly from 'patternfly-react';
import SectionLoader from '../../../../components/loader/SectionLoader';
import Runtime from '../../../models/Runtime';

interface RuntimeCardProps {
  selected?: boolean;
  runtime: Runtime;
  onSelect: (runtime: Runtime) => void;
}

function RuntimeCard(props: RuntimeCardProps) {
  const { runtime, onSelect, selected = false } = props;
  const doOnSelect = () => onSelect(runtime);
  return (
    <Patternfly.ListViewItem
      onClick={doOnSelect}
      checkboxInput={(<input type="radio" checked={selected} value={runtime.id} readOnly/>)}
      leftContent={(<img className={'runtime-icon'} src={runtime.icon}/>)}
      heading={runtime.name}
      description={runtime.description}
    />
  );
}

interface RuntimeSelectorProps {
  loading: boolean;
  selectedRuntime?: Runtime;
  runtimes: Runtime[];
  onSelect: (runtime: Runtime) => void;
}

function RuntimeSelection(props: RuntimeSelectorProps) {
  const {runtimes, onSelect, selectedRuntime} = props;
  console.log('runtimes' + runtimes);
  return (
    <div className={'runtime-selector'}>
      <SectionLoader loading={props.loading}>
        <p>Here you can choose a runtime for a specific programming language.</p>
        <Patternfly.ListView>
          {
            runtimes.map((runtime, i) => (
              <RuntimeCard key={i} runtime={runtime} onSelect={onSelect}
                           selected={selectedRuntime && selectedRuntime.id === runtime.id}/>)
            )
          }
        </Patternfly.ListView>
      </SectionLoader>
    </div>
  );
}

export default RuntimeSelection;
