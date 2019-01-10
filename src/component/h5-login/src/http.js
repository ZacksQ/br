import 'whatwg-fetch';
import qs from 'qs';

function checkStatus(res) {
  if (!res.ok) {
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
  return res;
}


function dataURLtoBlob(dataURL) {
  var binary = atob(dataURL.split(',')[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {
    type: 'image/jpeg'
  });
}


function minImage(name, file) {
  return new Promise((resolve, reject) => {
    var files = file,
      image = new Image(), //原始图片
      thumbW, //进行尺寸压缩的宽和高
      thumbH,
      blob,
      quality = 0.75, //质量压缩
      reader = new FileReader(),
      canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      url; //FileReader读取的url

    reader.onload = e => {
      url = e.target.result;
      image.onload = () => {
        const scale = image.height / image.width;
        thumbH = 1024 * scale;
        thumbW = 1024;
        canvas.width = thumbW;
        canvas.height = thumbH;

        context.drawImage(image, 0, 0, thumbW, thumbH);
        var dataUrl = canvas.toDataURL("image/jpeg", quality);

        blob = dataURLtoBlob(dataUrl);
        resolve({
          key: name,
          value: blob,
        });
      }
      image.src = url;
    }
    reader.readAsDataURL(files);
  });
}

// 初始化 get 请求选项
const init = {};

// 初始化 post 请求选项
const initPost = Object.assign({
  method: 'POST',
}, init);

const http = {

  /**
   * get 请求，返回未经格式化的数据
   * @param {string} url 请求地址
   * @param {Object} opts 选项，参考 https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch#Parameters
   * @return {string} result 服务器返回的数据
   */
  get(url, opts) {
    return fetch(url, Object.assign(init, opts))
      .then(checkStatus)
      .then(res => res.text());
  },

  /**
   * get 请求，返回格式化后的 JSON 数据
   * @param {string} url 请求地址
   * @param {Object} opts 选项，参考 https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch#Parameters
   * @return {Object} result 服务器返回的 JSON 数据
   */
  getJSON(url, opts) {
    return fetch(url, Object.assign(init, opts))
      .then(checkStatus)
      .then(res => res.json());
  },

  /**
   * post 请求，发送 FormData 类型的数据，返回的结果为格式化后的 JSON 数据
   * @param {string} url 请求地址
   * @param {Object} params 发送的参数
   * @param {Object} opts 选项，参考 https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch#Parameters
   * @return {Object} result 服务器返回的结果
   */
  post(url, params, opts) {
    return fetch(url, Object.assign(initPost, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(params),
      }, opts))
      .then(checkStatus)
      .then(res => res.json());
  },

  /**
   * post 请求，发送 JSON 类型的数据，返回的结果为格式化后的 JSON 数据
   * @param {string} url 请求地址
   * @param {Object} params 发送的参数
   * @param {Object} opts 选项，参考 https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch#Parameters
   * @return {Object} result 服务器返回的结果
   */
  postJSON(url, params, opts) {
    return fetch(url, Object.assign(initPost, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }, opts))
      .then(checkStatus)
      .then(res => res.json());
  },

  /**
   * 图片上传，返回的结果为格式化后的 JSON 数据
   * @param {String} url 上传接口
   * @param {Array} imgs 图片文件数组
   * @param {Object} form 其它数据字段
   */
  postImg(url, imgs = [], form = {}, limit = 8192) {

    const minArr = [];
    for (var key in imgs) {
      if (imgs.hasOwnProperty(key)) {
        // 如果 limit 为 -1 则不限制文件尺寸
        if (limit !== -1 && imgs[key].size / 1024 > limit) {
          let message = `${limit}KB`;
          if (limit >= 1024) {
            message = `${(limit / 1024).toFixed(1)}MB`;
          }
          throw new Error(`文件尺寸过大，请不要超过${message}`);
        } else {
          minArr.push(minImage(key, imgs[key]));
        }
      }
    }

    return Promise.all(minArr).then(compressImgs => {
      const data = new FormData();
      compressImgs.forEach(function (img) {
        data.append(img.key, img.value);
      }, this);

      for (var key in form) {
        if (form.hasOwnProperty(key)) {
          data.append(key, form[key]);
        }
      }

      return fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: data,
        })
        .then(checkStatus)
        .then(res => res.json());
    });
  },
};

export default http;