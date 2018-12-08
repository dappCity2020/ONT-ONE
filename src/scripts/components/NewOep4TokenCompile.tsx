import * as React from 'react';
import { connect } from 'react-redux';
import { init, compile, deploy } from '../actions/dapi';

interface Props {
  dispatch: any;
}

interface State {
  error: string;
}

const initialState = {
  error: null,
};

export default class NewOep4TokenCompile extends React.Component<Props, State> {

  private nameEle;
  private symbolEle;
  private decimalsEle;
  private supplyEle;
  private ownerAddrEle;

  constructor(props, state) {
    super(props, state);
    this.state = initialState;
  }

  render() {
    const { error } = this.state;

    return (
      <div className='oep4-token-details-form'>
        <h1>{'New Token Details'}</h1>
        <div className='counterButtons'>

          <div>
            <div>{'Token name:'}</div>
            <input
              ref={ref => this.nameEle = ref}
              placeholder='eg. Sausage Coin'
              defaultValue='Sausage Coin'
            />
          </div>

          <div>
            <div>{'Token symbol:'}</div>
            <input
              ref={ref => this.symbolEle = ref}
              placeholder='eg. SGC'
              defaultValue='SGC'
            />
          </div>

          <div>
            <div>{'Token decimals:'}</div>
            <input
              ref={ref => this.decimalsEle = ref}
              type='number'
              placeholder='eg. 8'
              defaultValue='8'
            />
          </div>

          <div>
            <div>{'Token total supply:'}</div>
            <input
              ref={ref => this.supplyEle = ref}
              placeholder='eg. 1000000000'
              defaultValue='1000000000'
            />
          </div>

          <div>
            <div>{'Owner address:'}</div>
            <input
              ref={ref => this.ownerAddrEle = ref}
              placeholder='AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ'
              defaultValue='AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ'
            />
          </div>

          {error ? (
            <div className='error' >{error}</div>
          ) : ''}

          <button
            onClick={() => this.handleSubmit()}
          >
            {'Submit'}
          </button>

        </div>
      </div>
    );
  }

  handleSubmit() {
    const { dispatch } = this.props;

    if (!this.nameEle.value) {
      this.setState({error: 'Name is blank!'});
      return;
    }

    if (!this.symbolEle.value) {
      this.setState({error: 'Symbol is blank!'});
      return;
    }

    if (!this.decimalsEle.value) {
      this.setState({error: 'Decimals is blank!'});
      return;
    }

    if (isNaN(Number(this.decimalsEle.value))) {
      this.setState({error: 'Decimals is not a valid number!'});
      return;
    }

    if (!this.supplyEle.value) {
      this.setState({error: 'Total supply is blank!'});
      return;
    }

    if (isNaN(Number(this.supplyEle.value))) {
      this.setState({error: 'Total supply is not a valid number!'});
      return;
    }

    if (!this.ownerAddrEle.value) {
      this.setState({error: 'Owner address is blank!'});
      return;
    }

    dispatch(compile({
      tokenName: this.nameEle.value,
      symbol: this.symbolEle.value,
      decimals: this.decimalsEle.value,
      totalSupply: this.supplyEle.value,
      owner: this.ownerAddrEle.value,
    }));
  }

}
