import is from "cl-util/lib/is";
import env from "./env";
export default {
  mode: /m\.chelun\.com/.test(window.location.host) ? 'production' : 'development',
  host: /m\.chelun\.com/.test(window.location.host) ? '//newcar.eclicks.cn' : '//newcar-test.eclicks.cn',
  fileHost: /m\.chelun\.com/.test(window.location.host) ? '//file.chelun.com' : '//upload-test.chelun.com',
  ajax(host, url, param = {}, opt = {}) {
    url = host + url;
    let commonParam = {
      //公共参数
      source: is.weixin ? '1' : '2'
    };
    if(env.openid){
      commonParam.openid = env.openid;
    }
    if(env.ac_token){
      commonParam.ac_token = env.ac_token;
    }
    param = Object.assign({}, param, commonParam);
    let seg = [];
    if (opt.method === 'POST') {
      const form = new FormData();
      for (let key in param) {
        form.append(key, param[key])
      }
      opt.body = form;
    } else {
      for (let key in param) {
        seg.push(`${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`);
      }
      if (seg.length > 0) {
        url += `?${seg.join('&')}`;
      }
    }
    return Promise.race([fetch(url, Object.assign({}, {
      method: 'GET',
      credentials: 'include'
    }, opt)).then((str) => {
      return str.json();
    }), new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: -1,
          msg: '网络请求超时，请检查你的网络是否正常'
        })
      }, 60000);
    })])
  },
  //上传图片
  upload(params) {
    return this.ajax(this.fileHost, '/upload?auth_type=1&ftype=14', params, {
      method: 'POST'
    });
  },
  //获取总里程 和 轮播图
  TotalMileage(){
    return this.ajax(this.host, '/BlueRibbon/TotalMileage');
  },
  //中奖轮播
  AwardList(){
    return this.ajax(this.host, '/BlueRibbon/AwardList');
  },
  //大奖名单
  prizeList(){
    return this.ajax(this.host, '/BlueRibbon/prizeList');
  },
  //助力
  Power(){
    return this.ajax(this.host, '/BlueRibbon/Power');
  },
  //抽奖资格
  LotteryEligibility(){
    return this.ajax(this.host, '/BlueRibbon/LotteryEligibility');
  },
  //抽奖
  Lottery(){
    return this.ajax(this.host, '/BlueRibbon/Lottery');
  },
  //分享
  share(type){
    if(type==='weixin'){
      //百度统计
      window._hmt.push(['_trackEvent', '车轮蓝丝带', '微信端H5分享']);
    }else{
      window._hmt.push(['_trackEvent', '车轮蓝丝带', '端内分享']);
    }
    return this.ajax(this.host, '/BlueRibbon/share');
  },
  //绑定
  bind(param){
    return this.ajax(this.host, '/BlueRibbon/bind', param);
  },
  //是否已绑定
  isBind(){
    return this.ajax(this.host, '/BlueRibbon/isBind');
  },
  //获取用户名
  getUserNicknameByUid(){
    return this.ajax(this.host, '/BlueRibbon/getUserNicknameByUid');
  },
  //完成油滴任务
  finishOil(params){
    return this.ajax(this.host, '/OilDrop/userFinishedTask', params);
  }
}