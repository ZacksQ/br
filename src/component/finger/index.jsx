import React from 'react';
import './index.scss';
import finger from './finger.png';

export default class Finger extends React.Component {
  render() {
    return (
      <div className={'Finger ' + (this.props.clName || '')}>
        <div className='lighting'></div>
        <div className='finger'>
          <img src={finger} alt=""/>
        </div>
      </div>
    )
  }
}