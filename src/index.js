// This must be the first line in src/index.js
import 'react-app-polyfill/ie9';
import './index.scss';
import loadPage from './page/home/loadPage';
import is from "cl-util/lib/is";
import env from './common/env';

//是否需要跳转到微信页面获取openid
let getOpenid = false;

//微信环境中, openid获取
(function () {
  if (is.weixin) {
    let storage = null;
    try {
      storage = JSON.parse(localStorage.getItem('chelun-blue-ribbon'));
    } catch (e) { }
    if (!storage) {
      storage = {}
    }

    const openid = env.getParam('openid') || storage.openid || null;
    if (!openid) {
      let backUrl = window.location.href.split('#')[0];
      if (backUrl.indexOf('?') > -1) {
        backUrl += '&' + Math.random();
      } else {
        backUrl += '?' + Math.random();
      }
      getOpenid = true;
      window.location.href = `http://wechatadmin.chelun.com/officialAccount/chelun?url=${encodeURIComponent(backUrl)}&type=snsapi_userinfo`;
    } else {
      storage.openid = openid;
      storage.nickname = env.getParam('nickname') || storage.nickname || null;
      storage.headimgurl = env.getParam('headimgurl') || storage.headimgurl || null;
      //存储进入env
      env.openid = storage.openid;
      env.nickname = storage.nickname;
      env.headimgurl = storage.headimgurl;
      //更新本地存储
      localStorage.setItem("chelun-blue-ribbon", JSON.stringify(storage));
    }
  }else if(!is.chelun){
    let chelun_acToken = localStorage.getItem('chelun_acToken');
    if(chelun_acToken){
      env.ac_token = chelun_acToken;
    }
  }
})();

if(!getOpenid){
  if(window.location.hash.split('?')[0] === '#/' || window.location.hash.split('?')[0] === ''){
    env.loadPage = new loadPage({
      onComplete: async ()=>{
        import('./main.js');
      }
    });
  }else{
    import('./main.js');
  }
}