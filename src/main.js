import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import App from './router/index';
import env from './common/env';
import share from './common/share';
import data from './common/data';
import config from './page/prize/config/config';
// import FastClick   from 'fastclick';
// FastClick.attach(document.body);

//渲染页面
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('container')
);

(function () {
  // 定义分享数据结构
  var shareData = {
    title: `我的今日运势：${config[env.getTodayNum()].title}！速速接好运，领1000元回家基金！`, // 分享标题
    desc: '参与全民助力，与爱同行！送山区儿童家长回家过年，领取千元回家基金！', // 分享描述
    link: window.location.origin + '/2018/chelun-blue-ribbon/index.html?' + Math.random(),
    imgUrl: 'https://static.clfile.com/g2/img/p/jjy/chelun-blue-ribbon-share.jpg'
  };
  // 调取分享 api
  share.addWeiXinConfigAndJWeixin();
  share.setWeiXinShare(shareData.imgUrl, shareData.title, shareData.desc, shareData.link);
  share.setWeiXinCallback(()=>{
    //分享成功，添加抽奖机会
    data.share('weixin');
  });
  share.setAppWxTimeLine(shareData);
  share.setAppWxMessage(shareData);
  window['CHELUN_SHOW_MENU_ITEMS'] = ['menu:refresh'];
})();

//debug
// (function(){
//   var url = '//cdn.jsdelivr.net/eruda/1.2.2/eruda.min.js';
//   if(url) {
//     var script = document.createElement('script');
//     script.src = url;
//     document.body.appendChild(script);
//     script.onload = function () {
//       window.eruda.init()
//     };
//   }
// })();