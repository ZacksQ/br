/**
 * @desc 项目配置
 */

import qs from 'qs';
// 页面通信协议
const PROT = window.location.protocol;
// 页面域名
const pageHost = `${PROT}//${window.location.host}`;
// 接口域名（根据页面域名区分开发与生产环境）
const apiHost = /m.chelun.com/.test(window.location.href) ?
  `${PROT}//buycar.eclicks.cn` : `${PROT}//buycar-test.eclicks.cn`;
const loginHost = /m.chelun.com/.test(window.location.host) ? '//passport.chelun.com' : '//passport-test.chelun.com';  
// 页面 URL 参数对象
const params = qs.parse(window.location.search.replace('?', ''));

export default {
	// 页面标题
	version: 'v1.0.0',
  title: '前端H5模板',
  // Api列表
  api: {
    getSmsCode: `${loginHost}/api_v2/get_sms_captcha?os=h5&channel=seckill`,
    postLogin: `${loginHost}/api_v2/login_with_captcha?os=h5&channel=seckill`,
  },
  // 页面 URL 参数
  params: params,
}