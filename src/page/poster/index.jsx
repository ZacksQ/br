import React from 'react';
import './index.scss';
import html2canvas from 'html2canvas';
import Button from '@material-ui/core/Button';
import DateComp from '../../component/date';
import Photo from '../../component/photo';
import TagSelect from './tagSelect';
import TagWrap from './tagWrap';
import is from "cl-util/lib/is";
import Alert from '../../component/alert';
import jsBridge from "../../common/jsBridge";
import "cl-util/lib/Loading/index.css";
import Loading from "cl-util/lib/Loading";
import data from '../../common/data';
import env from '../../common/env';

import qrcode from './qrcode.png';
import xin from './xin.png';
import share from './share.png';
import helpWord from './helpWord.png';
import freeWord from './freeWord.png';
import titleBg from '../../assets/title.png';
import themeBg from './theme.png';
import countBg from './timeCount.png';

export const PosterImg = [qrcode, xin, share, helpWord, freeWord, titleBg, themeBg, countBg];

export default class Poster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [], //已选择的标签
      bigLength: 0, //已选择的大标签数量
      shareTip: true,
      prize: props.match.params.prize, //中奖信息
      nickname: '', //用户名
      total_mileage: '--', //公里数
    }

    this.photoRef = React.createRef();
    //计算回家剩余时间
    this.leftTime = this.countTime('2019/02/04 00:00:00');
  }

  componentDidMount() {
    //获取用户名字
    if (env.nickname) {
      this.setState({
        nickname: env.nickname
      });
    } else {
      //通过接口获取用户名字
      data.getUserNicknameByUid().then(res => {
        if (res.code === 0) {
          this.setState({
            nickname: res.data.nickname
          });
        }
      });
    }
    //获取助力公里数
    if (env.total_mileage) {
      this.setState({
        total_mileage: env.total_mileage
      });
    } else {
      data.TotalMileage().then(res => {
        if (res.code === 0) {
          this.setState({
            total_mileage: res.data.total_mileage
          });
        }
      });
    }
  }

  //计算回家剩余时间
  countTime(endTime) {
    let spring = new Date(endTime);
    let left = spring - Date.now();
    let day = Math.floor(left / (24 * 60 * 60 * 1000));
    return `离春节回家还有${day > 0 ? day : 0}天`;
  }

  //删除标签
  removeTag(aTag) {
    let { tags, bigLength } = this.state;
    let newTags = [];
    tags.forEach(item => {
      if (item.id !== aTag.id) {
        newTags.push(item);
      }
    });
    if (aTag.type === 'big') {
      bigLength--;
    }
    this.setState({
      tags: newTags,
      bigLength
    });
  }

  //选择标签
  selectTag(aTag) {
    let { tags, bigLength } = this.state;

    //判断当前标签是否已经选择完成
    if (tags.length === 3) {
      //提醒用户 已经选择3个了
      Alert({
        type: 'tip',
        content: <p className='line1'>您已经完成了标签选择，如需修改，点击已选标签即可</p>
      });
      return;
    }

    //判断当前标签是否已经选择了
    let hasTag = tags.some(item => {
      return item.id === aTag.id
    });
    if (hasTag) {
      Alert({
        type: 'tip',
        content: <p className='line1'>您已经选择了当前标签，请选择其他标签</p>
      });
      //提醒用户 已经选择过当前标签了
      return;
    }

    //分大小标签判断
    if (aTag.type === 'big') {
      if (bigLength === 2 || (bigLength === 0 & tags.length === 2)) {
        //提醒用户类型选择错误
        Alert({
          type: 'tip',
          content: <p className='line1'>标签放不下啦，请选择正确的爱心标签</p>
        });
        return;
      }
      //长标签+1
      bigLength++;
    } else {
      if (bigLength > 0 && (tags.length - bigLength) === 1) {
        //提醒用户类型选择错误
        Alert({
          type: 'tip',
          content: <p className='line1'>标签放不下啦，请选择正确的爱心标签</p>
        });
        return;
      }
    }

    //添加标签
    tags.push(aTag);
    this.setState({ tags, bigLength });

  }

  //生成canvas
  createCanvas() {
    const { tags } = this.state;
    //判断是否选择标签
    if (tags.length < 3) {
      //提示选择标签
      Alert({
        type: 'tip',
        content: <p className='line1'>请选择标签</p>
      });
      return;
    }

    // 创建一个加载状态
    const loading = new Loading();

    //百度统计
    window._hmt.push(['_trackEvent', '车轮蓝丝带', '生成海报']);

    this.photoRef.current.destroy();

    //判断是否是ios，如果是ios，文字向下上偏移2px
    if (env.isIos()) {
      document.querySelector('.canvas-wrap').className = 'canvas-wrap canvas-ios';
    } else {
      document.querySelector('.canvas-wrap').className = 'canvas-wrap canvas-android';
    }

    html2canvas(document.querySelector('.canvas-wrap'), {
      backgroundColor: '#d4d4d4',
      scale: window.devicePixelRatio
    }).then(canvas => {
      const dataURL = canvas.toDataURL();
      const blob = env.dataURLToBlob(dataURL);
      //上传图片
      if (is.chelun) {
        data.upload({ file: blob }).then(res => {
          if (res.code === 0) {
            this.setState({
              poster: res.data.file
            }, () => {
              loading.destroy();
            });
          } else {
            Alert({
              type: 'tip',
              content: <p className='line1'>{res.msg}</p>
            });
            loading.destroy();
          }
        })
      } else {
        this.setState({
          poster: dataURL
        }, () => {
          loading.destroy();
        });
      }
    });
  }

  //隐藏分享提示
  hideShareMask() {
    this.setState({
      shareTip: false,
      backHomeBtn: true
    });
  }

  //客户端分享
  appShare() {
    const { poster } = this.state;
    //设置分享内容
    window['CHELUN_SHARE_DATA_WXTIMELINE'] = {
      type: 'photo',
      imgUrl: poster,
      imageUrl: poster,
      title: ''
    };
    //分享到微信朋友圈
    jsBridge('ui', 'shareMessage', {
      to: 'wxTimeline',
      shareCallBackName: (res)=>{
        console.log(res);
        if (res.result == 1) {
          data.share();
          this.setState({
            backHomeBtn: true
          });
        }
      }
    });
  }

  cutStr(str, max) {
    let byte = 0;
    let cutStr = '';
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i).toString(16).length === 4) {
        byte += 2;
      } else {
        byte += 1;
      }
      if (byte >= max - 3 && !cutStr) {
        cutStr = str.substring(0, i + 1);
      }
    }
    return byte > max ? (cutStr + '...') : str;
  }


  render() {
    const { tags, bigLength, poster, shareTip, total_mileage, nickname, prize, backHomeBtn } = this.state;
    const total_mileage_msg = `累计助力${total_mileage}公里`;
    //处理用户昵称，过长显示...
    const cutNickname = this.cutStr(nickname, 22);
    let backHome = false;
    if (!is.chelun && !is.weixin) {
      backHome = true;
    }
    if (backHomeBtn) {
      backHome = true;
    }
    console.log(backHome);
    if (poster) {
      return (
        <div className='Poster Poster-canvas'>
          <img className='poster-img' src={poster} alt="" />
          <div className='btn-wrap flex-center-center'>
            <Button className='btm-btn' onClick={this.appShare.bind(this)}>
              <div className='btn flex-center-center'>{is.chelun ? '分享海报 再抽一遍' : '长按上图保存'}</div>
            </Button>
            {
              backHome && (
                <Button className='btm-btn' onClick={() => {
                  this.props.history.push('/');
                }}>
                  <div className='btn btm-red flex-center-center'>返回首页 再抽一遍</div>
                </Button>
              )
            }
          </div>
          {
            shareTip && is.weixin ? (
              <div className='share-mask fixed' onClick={this.hideShareMask.bind(this)}>
                <img src={share} alt="" />
              </div>
            ) : null
          }
        </div>
      )
    }
    return (
      <div className='Poster'>
        <div className='canvas-wrap'>
          <div className='top flex-between'>
            <DateComp type='poster' />
            <div className='title'>
              <img className='title-bg' src={titleBg} alt="" />
              <p className='flex-center-center'>{total_mileage_msg}</p>
            </div>
            <div>
              <img className='logo' src={qrcode} alt="" />
            </div>
          </div>
          <div className='theme-wrap'>
            <img className='theme-bg' src={themeBg} alt="" />
            <p className='user flex-center-center'>
              <span>{cutNickname}</span>
              <img src={helpWord} alt="" />
            </p>
            <p className='prize-name flex-center-center'>
              <span>免费获得</span>
              <span className='ellipsis'>{prize}</span>
            </p>
          </div>
          <Photo ref={this.photoRef} />
          {
            tags.length > 0
              ? <TagWrap {...{ tags, bigLength }} removeTag={this.removeTag.bind(this)} />
              : (
                <div className='tag-tip flex-column-center-between'>
                  <div className='flex-center'>
                    <img src={xin} alt="" />
                    <p>请选择你喜欢的爱心标签</p>
                    <img src={xin} alt="" />
                  </div>
                  <p>左右划动选择你的爱心标签</p>
                </div>
              )
          }
          <div className='home-count'>
            <img className='count-bg' src={countBg} alt="" />
            <p>{this.leftTime}</p>
          </div>
        </div>
        <TagSelect select={this.selectTag.bind(this)} />
        <div className='btn-wrap flex-center-center'>
          <Button onClick={this.createCanvas.bind(this)}>
            <div className='btn flex-center-center'>生成专属海报</div>
          </Button>
        </div>
      </div>
    )
  }
}