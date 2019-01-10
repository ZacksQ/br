/**
 * 常量与正则
 */
;(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (global) {
    var common = {};

    /**
     * 常量
     */
    common.const = {
        //cookie常量
        COOKIE_APP_NAME: 'chelun_appName',//车轮APP名称，比如 查违章，车轮社区
        COOKIE_APP_VERSION: 'chelun_appVersion',//APP版本号
        COOKIE_APP_TOKEN: 'chelun_acToken',//车轮统一登录态，去服务端校验
        COOKIE_DEVICE: 'chelun_device',//机型，主要针对安卓，读取系统设备信息来做兼容性判断和数据统计
        COOKIE_OS_TYPE: 'chelun_osType',//操作系统 ios android
        COOKIE_OS_VERSION: 'chelun_osVersion',//IOS版本号   安卓版本号
        COOKIE_IS_LOGIN: 'chelun_isLogin',//是否登录
        //菜单
        MENU_WX_F: 'menu:share:wxMessage', //分享微信好友按钮
        MENU_WX_T: 'menu:share:wxTimeline', //分享朋友圈按钮
        MENU_REFRESH: 'menu:refresh', //刷新按钮
        MENU_CL_F: 'menu:share:clMessage', //分享车轮车友按钮
        MENU_QQ: 'menu:share:qq', //分享QQ按钮
        MENU_SINA: 'menu:share:sina', //分享新浪微博按钮
        MENU_SMS: 'menu:share:sms', //分享短信按钮
        MENU_COPY: 'menu:share:copyUrl', //复制链接
        MENU_OPEN: 'menu:share:openWithBrowser', //打开第三方浏览器
        //分享回调中设置的TO
        TO_WX_F: 'wxMessage',
        TO_WX_T: 'wxTimeline',
        TO_CL_F: 'clMessage',
        TO_QQ: 'qq',
        TO_SINA: 'sina',
        TO_SMS: 'sms',
        //JSBridge
        BRIDGE_SHOW_MENU : 'CHELUN_SHOW_OPTION_MENU',//是否显示右上角菜单按钮
        BRIDGE_MENU_ITEMS: 'CHELUN_SHOW_MENU_ITEMS',//显示的功能按钮列表
        BRIDGE_SHARE_CLMESSAGE : 'CHELUN_SHARE_DATA_CLMESSAGE',//车轮车友分享内容
        BRIDGE_SHARE_WXTIMELIN : 'CHELUN_SHARE_DATA_WXTIMELINE',//微信朋友圈分享内容
        BRIDGE_SHARE_WXMESSAGE : 'CHELUN_SHARE_DATA_WXMESSAGE',//微信朋友分享内容
        BRIDGE_SHARE_QQ : 'CHELUN_SHARE_DATA_QQ',//QQ好友分享内容
        BRIDGE_SHARE_SINA : 'CHELUN_SHARE_DATA_SINA',//新浪微博分享内容
        BRIDGE_SHARE_SMS : 'CHELUN_SHARE_DATA_SMS',//发短信内容
        BRIDGE_CUSTOM_CONFIG : 'CHELUN_CUSTOM_CONFIG',//自定义配置
        BRIDGE_DISSYS_URLLIST : 'CHELUN_DISSYS_URLLIST' //禁止拼系统参数的url配置列表
    };
    /**
     * 正则
     */
    common.regex = {
        mobile: /^1[0-9]{10}$/,//手机号码
        chinese: /^[\u4E00-\u9FA5]+$/, //全部是中文
        card: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/, //简单的身份证
        email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, //邮箱
        digits: /^\d+$/ //整数
    };
    return global.common = common;
});