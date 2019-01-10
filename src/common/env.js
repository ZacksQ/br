import Preloader from './preloader';

const env = {
  openid: '',
  ac_token: '',
  nickname: '',
  headimgurl: '',
  total_mileage: '',
  dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,';

    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      let parts = dataURL.split(',');
      let contentType = parts[0].split(':')[1];
      let raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {
        type: contentType
      });
    }

    let parts = dataURL.split(BASE64_MARKER);
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {
      type: contentType
    });
  },
  getParam(name) {
    let maps = {};
    let cookArr = window.location.search.substr(1).split('&');
    let hashArr = [];
    if (window.location.hash.split('?')[1]) {
      hashArr = window.location.hash.split('?')[1].split('&');
    }
    cookArr = cookArr.concat(hashArr);
    for (let i in cookArr) {
      let tmp = cookArr[i].replace(/^\s*/, '');
      if (tmp) {
        let pos = tmp.indexOf('=');
        if (pos > -1) {
          maps[tmp.substr(0, pos)] = tmp.substr(pos + 1, tmp.length - 1);
        } else {
          maps[tmp] = "";
        }
      }
    }
    return decodeURIComponent(maps[name] || '');
  },
  //获取今日运势下标
  getTodayNum() {
    let time = new Date();
    const storageName = `chelun-blue-ribbon-${time.getMonth() + 1}-${time.getDate()}`;
    let todayNum = localStorage.getItem(storageName);
    if (todayNum === null) {
      todayNum = Math.floor(Math.random() * 12);
      localStorage.setItem(storageName, todayNum);
    }
    return todayNum;
  },
  //判断是否是ios手机
  isIos() {
    let u = navigator.userAgent;
    let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isIos;
  },
  /**
   * 资源预加载
   *
   * @param {Object} param 
   * @param {Object} param.resources 需要预加载的图片资源数组
   * @param {Function} param.onProgress 资源加载进度
   * @param {Function} param.onComplete 加载完成
   */
  preload(param) {
    let preloader = new Preloader({
      resources: param.resources,
      concurrency: 4,
      perMinTime: 10 // 加载每个资源所需的最小时间
    });
    preloader.addProgressListener((loaded, length) => {
      param.onProgress && param.onProgress(loaded, length);
    });
    preloader.addCompletionListener(() => {
      param.onComplete && param.onComplete();
    });
    preloader.start();
  }
}

export default env;