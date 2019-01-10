import React from 'react';
import Button from '@material-ui/core/Button';
import is from "cl-util/lib/is";
import config from './config/config';
import env from '../../common/env';
import chelunCard from './chelunCard.png';

export default class Prize extends React.Component {
  constructor(props) {
    super(props);
    this.todayNum = env.getTodayNum();
  }

  //领取奖品
  getPrize() {
    this.props.getPrize && this.props.getPrize();
  }

  render() {
    const { prizeName } = this.props;
    return (
      <div className='Prize fixed flex-column-center-center'>
        <div className='top'>
          <img src={config[this.todayNum].img} alt="" />
          <div className='prize-border'>
            <div className='prize-wrap flex-between'>
              <div className='left'>
                <p className='title'>恭喜你抽中了</p>
                <p className='prize-name'>{prizeName}</p>
                <img src={chelunCard} alt="" />
              </div>
              <div className='right'>
                <p>{config[this.todayNum].text}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='btm flex-between'>
          <Button onClick={() => {
            window.location.hash = '/poster/' + prizeName;
          }}>
            <p className='share-btn flex-center-center'>{is.chelun ? '分享海报 再抽一遍' : '生成海报 再抽一遍'}</p>
          </Button>
          <Button onClick={this.getPrize.bind(this)}>
            <p className='receive-btn flex-center-center'>点击领取</p>
          </Button>
        </div>
      </div>
    )
  }
}