
// 基础引入
import React from 'react'
import ReactDOM from 'react-dom';
// 样式引入
import './index.scss'
// 图片引入
import successImg from './success.png'
// import warningImg from './warning.png'
import dianImg from './flash.png'

class ToastComponent extends React.Component{
    render(){
        let ContainerClassName = 'common-style',
            showImg = '';
        if(this.props.type === 'success') {
            showImg = successImg;
            ContainerClassName += ' success-container'
        } else if(this.props.type === 'warning') {
            showImg = '';
            ContainerClassName += ' warning-container'
        } else if(this.props.type === 'dian') {
            showImg = dianImg;
            ContainerClassName += ' dian-container'
        } else {
            
        }

        return (
            <div className={ContainerClassName}>
                
                <span>{this.props.msg}</span>
                {this.props.msg2 ? <span>{this.props.msg2}</span> : ''}
                {showImg ? <img src={showImg} alt=""/> : null}
            </div>
        )

    }
}

/**
 * 方法描述：触发toast
 * @param type {String} 有两个值：success(垂直布局)、warning(水平布局)
 * @param msg {String} 文案1
 * @param msg2 {String} 文案2
 */
const Toast = (type, msg, msg2) => {

    // 第一步：如果toast已经存在，先删除掉
    const toast = document.querySelector('.toast-dialog');
    if(toast) {
        ReactDOM.unmountComponentAtNode(toast);
        document.body.removeChild(toast);
    }

    // 第二步：渲染新的toast
    const div = document.createElement('div');
    div.classList.add('toast-dialog');
    ReactDOM.render((
        <ToastComponent
            type={type}
            msg={msg}
            msg2={msg2}
        />
    ), div);
    document.body.appendChild(div);

    // 第三步：清楚全局toast定时器
    if(window.toastTimer) {
        window.clearTimeout(window.toastTimer)
    }

    // 第四步：设置定时器，让toast自动消失
    window.toastTimer = setTimeout(()=> {
        const toast = document.querySelector('.toast-dialog');
        ReactDOM.unmountComponentAtNode(toast);
        document.body.removeChild(toast);
    }, 2000);

}

export default Toast;