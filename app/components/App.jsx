import React from 'react';

import Red from './Red';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      red: false
    };

    this.setRed = this.setRed.bind(this);
  }
  render() {
    return (
      <div>
        {!this.state.red && <button onClick={this.setRed}>Press me</button>}
        {this.state.red && <Red />}
      </div>
    );
  }
  setRed() {
    this.setState({
      red: true
    });
  }
}
