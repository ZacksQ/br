import React from 'react';
import './index.scss';
import Button from '@material-ui/core/Button';
import is from "cl-util/lib/is";
import config from './config/config';
import env from '../../common/env';
import cookie from "cl-util/lib/cookie"
import chelunCard from './chelunCard.png';
import ClLogin from '../../component/h5-login/src';
import Alert from '../../component/alert';
import data from '../../common/data';

export const PrizeImg = [chelunCard];

export default class Prize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginShow: false
    };
    this.todayNum = env.getTodayNum();
    //奖品名称
    this.sponsors = props.match.params.sponsors;
    this.prizeName = props.match.params.name;
  }

  //领取奖品
  getPrize() {
    if (is.chelun) {
      //判断是否是查违章app页面
      if (cookie.get('chelun_appName').toLowerCase() === 'queryviolations') {
        Alert({
          type: 'tip',
          content: <p className='line1'>奖品已发放至“车轮APP-我—优惠券”请自行前往查看</p>,
          btnText: '前往查看',
          onConfirm: ()=>{
            window.location.href = 'autopaiwz://welfare/list/open';
          }
        })
      } else {
        this.props.history.push('/download');
      }
    } else if(is.weixin) {
      data.isBind().then(res => {
        if (res.code === 0) {
          this.props.history.push('/download');
        } else if (res.code == '1') {
          this.setState({
            loginShow: true
          });
        } else {
          Alert({
            type: 'tip',
            content: <p className='line1'>{res.msg}</p>
          })
        }
      })
    }else{
      this.props.history.push('/download');
    }
  }

  //绑定车轮账号
  bindChelun(param) {
    data.bind({
      ac_token: param.ac_token
    }).then(res => {
      if (res.code === 0) {
        this.props.history.push('/download');
      } else {
        Alert({
          type: 'tip',
          content: <p className='line1'>{res.msg}</p>
        })
      }
    })
  }

  render() {
    return (
      <div className='Prize flex-column-center-center' style={{minHeight: `${document.documentElement.clientHeight}px`}}>
        <div className='top'>
          <img src={config[this.todayNum].img} alt="" />
          <div className='prize-border'>
            <div className='prize-wrap flex-between'>
              <div className='left'>
                <p className='title'>恭喜你抽中了</p>
                <div className='prize-name'>
                  <p>{this.prizeName}</p>
                  <p className='prize-sponsors'>{this.sponsors}</p>
                </div>
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
            window.location.hash = '/poster/' + this.prizeName;
          }}>
            <p className='share-btn flex-center-center'>{is.chelun ? '分享海报 再抽一遍' : '生成海报 再抽一遍'}</p>
          </Button>
          <Button onClick={this.getPrize.bind(this)}>
            <p className='receive-btn flex-center-center'>点击领取</p>
          </Button>
        </div>
        {
          this.state.loginShow && <ClLogin onClose={() => {
            this.setState({
              loginShow: false
            });
          }} onSuccess={this.bindChelun.bind(this)} />
        }
      </div>
    )
  }
}