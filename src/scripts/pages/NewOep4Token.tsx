import * as React from 'react';
import { connect } from 'react-redux';
import { init, compile, deploy } from '../actions/dapi';
import NewOep4TokenCompile from '../components/NewOep4TokenCompile';
import NewOep4TokenDeploy from '../components/NewOep4TokenDeploy';
import NewOep4TokenReceipt from '../components/NewOep4TokenReceipt';

interface Props {
  dispatch: any;
  networks: string[];
  pendingCompileDetails: any;
  compileDetails: any;
  pendingDeployDetails: any;
  deployDetails: any;
}

interface State {
  networkIndex: number;
  error: string;
}

const initialState = {
  networkIndex: 0,
  error: null,
};

class NewOep4Token extends React.Component<Props, State> {

  constructor(props, state) {
    super(props, state);
    this.state = {
      ...initialState,
      networkIndex: props.networks.length || initialState.networkIndex,
    };

    props.dispatch(init());
  }

  render() {
    return (
      <div className='oep4-token'>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    const {
      dispatch,
      networks,
      compileDetails,
      pendingCompileDetails,
      deployDetails,
    } = this.props;

    if (deployDetails) {
      return (
        <NewOep4TokenReceipt
          dispatch={dispatch}
          compileDetails={pendingCompileDetails}
          deployDetails={deployDetails}
        />
      );
    }

    if (compileDetails) {
      return (
        <NewOep4TokenDeploy
          dispatch={dispatch}
          compileDetails={pendingCompileDetails}
          networks={networks}
        />
      );
    }

    return (
      <NewOep4TokenCompile
        dispatch={dispatch}
      />
    );
  }
}

function mapStateToProps(state) {
  let {
    dapi,
  } = state;

  return {
    networks: dapi.networks,
    pendingCompileDetails: dapi.pendingCompileDetails,
    compileDetails: dapi.compileDetails,
    pendingDeployDetails: dapi.pendingDeployDetails,
    deployDetails: dapi.deployDetails,
  };
}

export default connect(mapStateToProps)(NewOep4Token);
