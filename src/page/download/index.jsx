import React from 'react';
import './index.scss';
import Button from '@material-ui/core/Button';
import iconDown2 from './iconDown2.png';
import iconDown from './iconDown.png';
import app from './app.png';
import Clipboard from 'clipboard';
import Alert from '../../component/alert';

export default class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const clipboard = new Clipboard('#btn');
    clipboard.on('success', function (e) {
      //百度统计
      window._hmt.push(['_trackEvent', '车轮蓝丝带', '淘口令复制']);
      Alert({
        type: 'tip',
        content: <p className='line1'>复制完成</p>
      })
    });

  }

  render() {
    return (
      <div className='Download flex-column-center'>
        <p className='title flex-center-center'>
          <img className='icon-dwon2' src={iconDown2} alt="" />
          <span>前往APP查看已中奖奖品</span>
          <img className='icon-dwon2' src={iconDown2} alt="" />
        </p>
        <p>一键复制车轮口令，打开<span className='fs-bold'>车轮查违章APP</span>即可查看奖品详情</p>
        <Button className='btn-wrap'>
          <p id='btn' className='btn flex-center-center' data-clipboard-text={/m\.chelun\.com/.test(window.location.host) ? '$*Bg.AvdEEg*$' : '$*AQ.mKEB.HJvqCg*$'}>一键复制</p>
        </Button>
        <img className='icon-dwon' src={iconDown} alt="" />
        <img className='app' src={app} alt="" />
        <p>提示：未安装请先到APP Store或应用商店下载</p>
        <Button className='btn-wrap' onClick={() => {
          window.location.href = 'https://chelun.com/url/5jRF8kXE';
        }}>
          <p className='btn flex-center-center'>去下载</p>
        </Button>
      </div>
    )
  }
}