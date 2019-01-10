/**
 * 分享
 */
var common = require('./const');
;(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (global) {
    var share = {};

    //------------------------------------------------------------------------------------------------------------------
    //微信客户端
    //------------------------------------------------------------------------------------------------------------------
    /**
     * 在微信客户端操作分享
     * 1图片 2标题 3说明 4链接
     */
    share.setWeiXinShare = function() {
        //可在页面中设置全局属性，如果有参数传进来就用传进来的参数
        var c_tImgUrl = arguments[0] || global.tImgUrl;
        var c_tTitle = arguments[1] || global.tTitle;
        var c_tContent = arguments[2] || global.tContent;
        var c_tLink = arguments[3] || global.tLink;
        //t是朋友圈  f是单个好友
        return global.shareData = {
            "tLink": c_tLink,   //链接
            "tImgUrl": c_tImgUrl, //图片
            "tTitle": c_tTitle,  //标题 朋友圈只有标题 没有内容
            "tContent": c_tContent, //正文
            "fLink": c_tLink,
            "fImgUrl": c_tImgUrl,
            "fTitle": c_tTitle,
            "fContent": c_tContent
        };
    };

    /**
     * 微信客户端分享成功后回调方法设置
     */
    share.setWeiXinCallback = function() {
        global._report_share_success = arguments[0];
    };

    /**
     * 动态添加微信客户端配置链接
     * 1默认添加一次
     */
    share.addWeiXinConfig = function(multi, url, fn) {
        _config(multi, url, fn);
    };
    share.addWeiXinConfigAndJWeixin = function(multi, url, fn) {
        //添加微信链接
        var script = document.createElement("script");
        var body = document.getElementsByTagName("body")[0];
        script.src = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';//微信的链接地址
        script.onload = function() {
            _config(multi, url, fn);
        };
        body.appendChild(script);
    };
    function _config(multi, url, fn) {
        multi = multi || false;
        var script = document.createElement("script");
        if(!multi) {
            script.setAttribute('id', 'bridge');
        }
        url = url || '//front.chelun.com/new_bridge.js';////service.eclicks.cn:8080/service_utility/weixin/new_share_bridge.js

        script.src = url+"?id=" + Date.now();
        if(fn) {
            script.onload = fn;
        }
        var body = document.getElementsByTagName("body")[0];
        if(!multi && document.getElementById('bridge')) {
            return;
        }
        body.appendChild(script);
    }

    /**
     * 微信事件重新绑定
     */
    share.onWeiXin = function() {
        try {
            window.wx.onMenuShareTimeline({
                title: global.shareData.tTitle,
                link: global.shareData.tLink,
                imgUrl: global.shareData.tImgUrl,
                desc: global.shareData.tContent,
                success: function () {
                    if(typeof _report_share_success === "function") {
                        global._report_share_success('weixin_timeline');
                    }
                },
                cancel: function () { }
            });

            window.wx.onMenuShareAppMessage({
                title: global.shareData.fTitle,
                link: global.shareData.fLink,
                imgUrl: global.shareData.fImgUrl,
                desc: global.shareData.fContent,
                success: function () {
                    if(typeof _report_share_success === "function") {
                        global._report_share_success('weixin_app');
                    }
                },
                cancel: function () { }
            });
        }catch (e) {
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    //车轮客户端
    //------------------------------------------------------------------------------------------------------------------
    /**
     * 分享成功后回调方法设置
     * 1分享环境 2分享自己特定回调 3通用回调
     */
    share.setAppCallback = function() {
        var args = {};
        arguments[0] && (args.to = arguments[0]);
        arguments[1] && (args.shareCallBackName = arguments[1]);
        arguments[2] && (args.callback = arguments[2]);
        return args;
    };
    /**
     * 设置车轮车友分享
     */
    share.setAppClMessage = function(attrs) {
        global[common.const.BRIDGE_SHARE_CLMESSAGE] = attrs;
    };
    /**
     * 设置微信朋友圈分享
     */
    share.setAppWxTimeLine = function(attrs) {
        global[common.const.BRIDGE_SHARE_WXTIMELIN] = attrs;
    };
    /**
     * 设置微信好友分享
     */
    share.setAppWxMessage = function(attrs) {
        global[common.const.BRIDGE_SHARE_WXMESSAGE] = attrs;
    };
    /**
     * 设置QQ分享
     */
    share.setAppQQ = function(attrs) {
        global[common.const.BRIDGE_SHARE_QQ] = attrs;
    };
    /**
     * 设置新浪微博分享
     */
    share.setAppSina = function(attrs) {
        global[common.const.BRIDGE_SHARE_SINA] = attrs;
    };
    /**
     * 设置短信分享
     */
    share.setAppSms = function(attrs) {
        global[common.const.BRIDGE_SHARE_SMS] = attrs;
    };

    return global.share = share;
});