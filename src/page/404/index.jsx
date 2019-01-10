import React from 'react';
import './index.scss';

export default class NoMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return <div>404 not found</div>
  }
}