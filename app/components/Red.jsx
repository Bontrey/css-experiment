import React from 'react';

import RedLoader from './RedLoader';

export default class Red extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  componentWillMount() {
    RedLoader().then(({ redInternal }) => {
      this.setState({
        internal: redInternal.default
      });
    });
  }
  render() {
    return (
      <div>
        {'internal' in this.state && <this.state.internal />}
      </div>
    );
  }
}
