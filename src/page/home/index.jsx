import React from 'react';
import './index.scss';
import Button from '@material-ui/core/Button';
import Date from '../../component/date';
import Winner from './winner';
import Photo from '../../component/photo';
import Supports from './supports';
import Alert from '../../component/alert';
import data from '../../common/data';
import "cl-util/lib/Loading/index.css";
import Loading from "cl-util/lib/Loading";
import jsBridge from "../../common/jsBridge";
import is from 'cl-util/lib/is';
import env from '../../common/env';
import preloadOtherSources from '../../common/preloadOtherSources';
import Finger from '../../component/finger';
import ClLogin from '../../component/h5-login/src';

import logo from './logo.png';
import theme from './theme.png';
import help from './help.png';
import ticket from './ticket.png';
import koubei from './koubei.png';
import fiveYears from './fiveYears.png';
import aboutLsd from './aboutLsd.png';
import winners from './winners.png';
import intro from './intro.png';
import save from './save.png';
import jinhui from './jinhui.png';
import laigongyi from './laigongyi.png';
import lsdPhoto from './lsdPhoto.png';
import prizeTitle from './prizeTitle.png';

import share from '../poster/share.png';

//首页首屏的其他资源
import photo1 from '../../component/photo/photo1.jpg';
import desc from '../../component/photo/desc.png';
import titleBg from '../../assets/title.png';
import winnerBg from './winner.png';
import helpBg from './help-bg.png';

export const HomeImg = [titleBg, logo, winnerBg, theme, help, helpBg, ticket, koubei, fiveYears, aboutLsd, winners, intro, save, jinhui, laigongyi, lsdPhoto, prizeTitle, photo1, desc];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_mileage: undefined,
      picture: {},
      winnner: [], //中奖名单
      prize: null, //大奖名单
      power: false, //是否助力过

      shareTip: false, //微信分享提示

      loginShow: false, //端外非微信
    }
  }

  async componentDidMount() {
    //关闭进度条
    if (env.loadPage) {
      env.loadPage.destroy();
    }
    //获取接口数据
    await this.getData();
    //加载其他图片资源
    preloadOtherSources();
  }

  componentDidUpdate() {
    //如果公里数改变了，存储到env中
    if (env.total_mileage !== this.state.total_mileage) {
      env.total_mileage = this.state.total_mileage;
    }
  }

  async getData() {
    // 创建一个加载状态
    // const loading = new Loading();
    //获取总里程 和 轮播图
    await this.getTotalMileage();
    //获取中奖轮播
    await this.getAwardList();
    //销毁加载状态
    // loading.destroy();
  }

  //获取总里程 和 轮播图
  async getTotalMileage() {
    await data.TotalMileage().then(res => {
      if (res.code === 0) {
        this.setState(res.data);
      }
    });
  }

  //获取中奖轮播
  async getAwardList() {
    await data.AwardList().then(res => {
      if (res.code === 0) {
        this.setState({
          winner: res.data
        });
      }
    });
  }

  //显示蓝丝带介绍
  showLsdIntro() {
    Alert({
      title: '了解蓝丝带',
      content: (
        <div className='Lsd-intro'>
          <img src={lsdPhoto} alt='' />
          <div className='title'>
            <span>2015年，蓝丝带车主联盟在上海正式成立</span>
          </div>
          <p>以首个中国车主聚集地“车轮社区”为主要发起方  ，联合上汽车享、百度地图，网聚数百家移动互联APP的力量，呼吁车主贡献爱心，联盟以“蓝丝带”为统一符号，车上系上“蓝丝带”的车主将尽己所能为遇到困难的车主或旅人提供无偿帮助。</p>
          <p>车轮·蓝丝带车主联盟，迄今已帮助全国2800万游子顺利回家，2019年，从心出发，弘扬爱心公益理念，为全国返乡游子保驾护航。蓝丝带，温暖你的回家路。</p>
        </div>
      )
    })
  }

  //显示活动玩法
  showActivityIntro() {
    Alert({
      title: '活动玩法',
      content: (
        <div className='Activity-intro'>
          <div className='title'>
            <span>时间</span>
          </div>
          <p>即日起至2019年2月5日</p>
          <div className='title'>
            <span>里程助力</span>
          </div>
          <p>每位用户每助力1公里</p>
          <p>车轮就会为山区儿童捐赠0.01元</p>
          <p>所有善款由车轮提供</p>
          <p>每位用户每天助力上限为1公里</p>
          <div className='title'>
            <span>抽奖规则</span>
          </div>
          <p>进入活动页面，助力成功后方可参与抽奖活动</p>
          <p>每日用户自动获得1次抽奖机会</p>
          <p><span className='active'>每分享1次增加1次抽奖机会，每日5次封顶</span></p>
          <p>每位用户均有机会获得千元回家基金</p>
          <p>登陆车轮APP提交验证信息后</p>
          <p>将在10个工作日内与您取得联系并发放基金。</p>
          <p>券码类奖品立即生效，可登陆车轮APP领取</p>
          <p>实物类奖品需在车轮APP内登记快递信息</p>
          <p>由于快递停运、春节放假等原因</p>
          <p>2月11日起陆续发货，5个工作日内完成发货。</p>
          <p>中奖者有义务提供姓名、手机号、地址用于奖品发放，如无法联系或未填写信息，视为自动放弃获奖资格。</p>
          <p>本活动最终解释权归车轮所有</p>
        </div>
      )
    })
  }

  //显示中奖名单
  async showWinners() {
    let { prize } = this.state;
    if (prize === null) {
      let prizeRes = await data.prizeList();
      if (prizeRes.code === 0) {
        prize = prizeRes.data;
        this.setState({ prize })
      } else {
        Alert({
          type: 'tip',
          content: <p className='line1'>{prizeRes.msg}</p>
        });
        return;
      }
    }
    Alert({
      title: '中奖公示',
      content: (
        <div className='Winner-intro'>
          <img src={prizeTitle} alt='' />
          <div className='winner-list'>
            {
              prize.map((item, index) => {
                return (
                  <p key={index} className='winner-item flex-between'>
                    <span className='ellipsis'>{item.nick}</span>
                    <span className='ellipsis'>{item.phone}</span>
                  </p>
                )
              })
            }
            {
              prize.length === 0 && <p>暂无中奖名单</p>
            }
          </div>
          <p>以上中奖者请及时至车轮APP填写相关信息</p>
          <p>工作人员审核后会为您发放基金。</p>
        </div>
      )
    })
  }

  //登录判断
  loginCheck() {
    if (!is.chelun && !is.weixin) {
      // Alert({
      //   type: 'tip',
      //   content: <p className='line1'>请在微信浏览器中使用</p>
      // });
      if (!env.ac_token) {
        this.setState({
          loginShow: true
        });
        return false;
      } else {
        return true;
      }
    }
    if (is.chelun && !is.chelunLogin) {
      jsBridge('app', 'login', {
        loginCallBackName(res) {
          if (res.result == 1) {
            window.location.reload();
          }
        }
      });
      return false;
    }
    return true;
  }

  //登录成功
  loginSuccess(data) {
    if (data.ac_token) {
      Alert({
        type: 'tip',
        content: <p className='line1'>登录成功</p>
      });
      this.setState({
        loginShow: false
      },()=>{
        localStorage.setItem('chelun_acToken', data.ac_token);
        env.ac_token = data.ac_token;
      });
    }
  }

  //完成油滴任务
  finishOil() {
    if (env.getParam('taskId')) {
      data.finishOil({
        task_id: env.getParam('taskId')
      });
    }
  }

  //去助力
  gotoHelp() {
    // 登录判断
    if (!this.loginCheck()) return;
    const { power } = this.state;
    if (power) {
      Alert({
        type: 'tip',
        content: <p>每人每天助力上限为1公里<br />抽奖次数上限为5次<br />明天再来助力吧</p>
      });
      return;
    }
    // 创建一个加载状态
    const loading = new Loading();
    data.Power().then(res => {
      if (res.code === 0) {
        this.setState({
          power: true,
          total_mileage: res.data.total_mileage
        }, () => {
          Alert({
            type: 'tip',
            content: <p>感谢您对留守儿童的关爱<br />我们已向大山小爱支教协会<br />捐赠0.01元善款<br />欢迎明天再来助力</p>,
            btnText: '去抽奖',
            onConfirm: () => {
              this.props.history.push('/lottery');
            }
          });
          //告知完成油滴任务
          this.finishOil();
        })
      } else if (res.code === 1) {
        this.setState({
          power: true
        }, () => {
          Alert({
            type: 'tip',
            content: <p>每人每天助力上限为1公里<br />抽奖次数上限为5次<br />明天再来助力吧</p>
          });
        })
      } else if(res.code == '12001'){
        this.setState({
          loginShow: true
        });
      }else {
        Alert({
          type: 'tip',
          content: <p className='line1'>{res.msg}</p>
        });
      }
      loading.destroy();
    });
  }

  //测今日运势 领千元基金
  gotoTicket() {
    // 登录判断
    if (!this.loginCheck()) return;
    //获取抽奖资格
    if (this.fetching) return;
    this.fetching = true;
    data.LotteryEligibility().then(res => {
      if (res.code === 0) {
        if (res.data.remaining > 0) {
          this.props.history.push('/lottery');
        } else {
          if (res.data.power > 0) {
            Alert({
              type: 'help',
              onConfirm: () => {
                this.gotoHelp();
              }
            });
          } else if (res.data.share > 0) {
            Alert({
              type: 'tip',
              content: <p>今日您已使用{5 - res.data.share}次抽奖机会，还有{res.data.share}次抽奖机会<br />邀请好友参与，可增加1次抽奖机会</p>,
              btnText: is.weixin ? '好的' : '分享',
              onConfirm: () => {
                if (is.chelun) {
                  //分享到微信朋友圈
                  jsBridge('ui', 'shareMessage', {
                    to: 'wxTimeline',
                    shareCallBackName(res) {
                      if (res.result == 1) {
                        data.share();
                      }
                    }
                  });
                } else if (is.weixin) {
                  this.setState({
                    shareTip: true
                  });
                }else{
                  data.share();
                }
              }
            });
          } else {
            Alert({
              type: 'tip',
              content: <p>每人每天助力上限为1公里<br />抽奖次数上限为5次<br />明天再来助力吧</p>
            });
          }
        }
      }
      this.fetching = false;
    });
  }

  //关闭分享提示
  hideShareMask() {
    this.setState({
      shareTip: false
    });
  }

  render() {
    const { total_mileage, picture = {}, winner, shareTip, loginShow } = this.state;
    return (
      <div className='Home'>
        <div className='top flex-between'>
          <Date />
          <div className='title'>
            <p>累计助力{total_mileage === undefined ? '--' : total_mileage}公里</p>
          </div>
          <div>
            <img className='logo' src={logo} alt="" />
          </div>
        </div>
        <Winner data={winner} />
        <img className='theme' src={theme} alt="" />
        <Photo />
        <div className='img-wrap flex-center-between'>
          <Button onClick={this.gotoHelp.bind(this)}>
            <img className='small shake-little shake-constant' src={help} alt="" />
          </Button>
          <Button onClick={this.gotoTicket.bind(this)}>
            <img className='big shake-little-later shake-constant' src={ticket} alt="" />
            <Finger clName='finger-cmp' />
          </Button>
        </div>
        <div className='btn-wrap flex-center-between'>
          <Button onClick={this.showLsdIntro.bind(this)}>
            <img src={aboutLsd} alt="" />
          </Button>
          <Button onClick={this.showWinners.bind(this)}>
            <img src={winners} alt="" />
          </Button>
          <Button onClick={this.showActivityIntro.bind(this)}>
            <img src={intro} alt="" />
          </Button>
        </div>
        <div className='img-wrap flex-center-between'>
          <img className='small' src={koubei} alt="" />
          <img className='big' src={fiveYears} alt="" />
        </div>
        <div className='jinhui-wrap flex-center-between'>
          <img className='big' src={jinhui} alt="" />
          <img className='small' src={save} alt="" />
        </div>
        <img className='laigongyi' src={laigongyi} alt="" />
        {
          picture.corporation && picture.corporation.length > 0 ? <Supports clName='company' data={picture.corporation} /> : null
        }
        {
          picture.media && picture.media.length > 0 ? <Supports clName='media' data={picture.media} /> : null
        }
        <p className='copyright'>活动最终解释权归车轮所有</p>
        {
          shareTip && is.weixin ? (
            <div className='share-mask fixed' onClick={this.hideShareMask.bind(this)}>
              <img src={share} alt="" />
            </div>
          ) : null
        }
        {
          loginShow && <ClLogin onClose={() => {
            this.setState({
              loginShow: false
            });
          }} onSuccess={this.loginSuccess.bind(this)} />
        }
      </div>
    )
  }
}