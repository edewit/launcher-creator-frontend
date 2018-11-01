import SwitchStep from '../../../../components/wizard/steps/SwitchStep';
import { connect } from 'react-redux';
import { AppState } from '../../../states';

const mapStateToRuntimeStepProps = (state:AppState, props) => ({});

const mapDispatchToProps = (dispatch) => ({});

const SwitchStepContainer = connect(mapStateToRuntimeStepProps, mapDispatchToProps)(SwitchStep);

export default SwitchStepContainer;