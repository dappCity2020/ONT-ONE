import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class App extends React.Component<any, any> {

  render() {
    const { dispatch } = this.props;
    return (
      <div className='index'>
        <button onClick={() => dispatch(push('/oep4'))}>OEP4</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
