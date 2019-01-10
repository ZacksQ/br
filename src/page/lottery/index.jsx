import React from 'react';
import './index.scss';
import anime from 'animejs'
import Canvas from './canvas';
import topPic from './topPic.png';
import midPic from './midPic.png';
import signPic from './signPic.png';
import signBtn from './signBtn.png';
import line from './line.gif';
import data from '../../common/data';
import Alert from '../../component/alert';

//需要预加载的资源
export const LotteryImg = [topPic, midPic, signPic, signBtn, line];

export default class Lottery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motionEnd: false, //动画结束
      prizeName: '', //奖品名称
      sponsors: '', //赞助商
      loginShow: false
    }
  }

  //隐藏辅助线
  hideHelpLine() {
    anime({
      targets: '.line-wrap',
      opacity: 0,
      duration: 200
    })
  }

  //动画结束，弹出中奖信息
  motionEnd(){
    this.setState({
      motionEnd: true
    },()=>{
      this.gotoPrize();
    });
  }

  gotoPrize(){
    const { motionEnd, prizeName, sponsors } = this.state;
    if(motionEnd && prizeName){
      this.props.history.push('/prize/' + prizeName + '/' + sponsors);
    }
  }

  //抽取奖品
  lottery(){
    window._hmt.push(['_trackEvent', '车轮蓝丝带', '抽奖']);
    data.Lottery().then(res=>{
      if(res.code === 0){
        this.setState({
          prizeName: res.data.name,
          sponsors: res.data.sponsors
        },()=>{
          this.gotoPrize();
        });
      }else{
        Alert({
          type: 'tip',
          content: <p className='line1'>{res.msg}</p>,
          onConfirm: ()=>{
            this.props.history.goBack();
          }
        })
      }
    })
  }
  
  render() {
    return (
      <div className='Lottery'>
        <div className='lottery-wrap flex-column-center-between fixed'>
          <div className='top'>
            <img src={topPic} alt="" />
          </div>
          <div className='mid'>
            <img src={midPic} alt="" />
          </div>
          <div className='btm'>
            <img src={signPic} alt="" />
            <div className='sign-btn'>
              <img src={signBtn} alt="" />
            </div>
            <div className='line-wrap'>
              <img src={line} alt="" />
            </div>
          </div>
        </div>
        <Canvas start={this.lottery.bind(this)} end={this.hideHelpLine.bind(this)} motionEnd={this.motionEnd.bind(this)} />
      </div>
    )
  }
}