import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import o3dapi from 'o3-dapi-core';

interface Props {
  dispatch: any;
  compileDetails: any;
  deployDetails: any;
}

interface State {
  isDeployed: boolean;
}

const initialState = {
  isDeployed: false,
};

export default class NewOep4TokenReceipt extends React.Component<Props, State> {

  constructor(props, state) {
    super(props, state);
    this.state = initialState;

    const { deployDetails } = props;
    const { network, contractHash } = deployDetails;

    const interval = setInterval(() => {
      o3dapi.ONT.oep4.getName({
        network,
        scriptHash: contractHash,
      })
      .then(res => {
        if (res.name) {
          clearInterval(interval);
          this.setState({isDeployed: true});
        }
      })
      .catch(() => {});
    }, 1000);
  }

  render() {
    const { compileDetails, deployDetails } = this.props;
    const { isDeployed } = this.state;
    const {
      tokenName,
      symbol,
      decimals,
      totalSupply,
      owner ,
    } = compileDetails;

    const {
      contractHash,
      txid,
    } = deployDetails;

    return (
      <div className='token-details-confirmation'>
        <h1>{'Token Creation Completed!'}</h1>
        <div className='counterButtons'>

          <div>
            <div className='row'>{`Token name: ${tokenName}`}</div>
            <div className='row'>{`Token symbol: ${symbol}`}</div>
            <div className='row'>{`Token decimals: ${decimals}`}</div>
            <div className='row'>{`Token total supply: ${totalSupply}`}</div>
            <div className='row'>{`Owner address: ${owner}`}</div>
            <div className='row'>{`Contract hash: ${contractHash}`}</div>
            <div className='row'>{`Transaction ID: ${txid}`}</div>
          </div>

          {isDeployed ? (
            <button
              onClick={() => this.handleSubmit()}
            >
              {'Done'}
            </button>
          ) : 'Waiting for confirmation...'}

        </div>
      </div>
    );
  }

  handleSubmit() {
    const { dispatch } = this.props;
    dispatch(goBack());
  }
}