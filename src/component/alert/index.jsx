import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Button from '@material-ui/core/Button';
import introBtn from './introBtn.png';
import helpPic from './helpPic.png';
import helpBtn from './helpBtn.png';

import tipBg from './tip-bg.png';
import tipBtn from './tipBtn.png';

export const AlertImg = [introBtn, helpPic, helpBtn, tipBg, tipBtn];

class Alert extends React.Component {

  static defaultProps = {
    title: '',
    content: '',
    onConfirm: undefined,
    onClose: undefined,
    btnText: '好的'
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.props.container);
    document.body.removeChild(this.props.container);
  }

  onClose() {
    this.destroy();
    if (this.props.onClose && typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }

  onConfirm() {
    this.destroy();
    if (this.props.onConfirm && typeof this.props.onConfirm === 'function') {
      this.props.onConfirm();
    }
  }

  render() {
    const props = this.props;
    if (props.type === 'intro') {
      return (
        <div className='Alert fixed flex-column-center-center' onClick={(e) => {
          if (e.target.className === e.currentTarget.className) {
            this.onClose();
          }
        }}>
          <div className='title flex-center-between'>
            <span>\\\\</span>
            <span className='name'>{props.title}</span>
            <span>{'////'}</span>
          </div>
          <div className='content'>
            <div className='wrap-dotted' style={{maxHeight: `${document.documentElement.clientHeight*0.7}px`}}>
              <div className='wrap'>
                {props.content}
              </div>
            </div>
          </div>
          <Button className='introBtn' onClick={this.onConfirm.bind(this)}>
            <img src={introBtn} alt="" />
          </Button>
        </div>
      )
    }

    if (props.type === 'help') {
      return (
        <div className='Alert fixed flex-column-center-center' onClick={(e) => {
          if (e.target.className === e.currentTarget.className) {
            this.onClose();
          }
        }}>
          <img className='helpPic' src={helpPic} alt="" />
          <Button className='helpBtn' onClick={this.onConfirm.bind(this)}>
            <img src={helpBtn} alt="" />
          </Button>
        </div>
      )
    }

    if (props.type === 'tip') {
      return (
        <div className='Alert fixed flex-column-center-center' onClick={(e) => {
          if (e.target.className === e.currentTarget.className) {
            this.onClose();
          }
        }}>
          <div className='tip-content flex-column-center-center'>
            {props.content}
            <Button className='tipBtn' onClick={this.onConfirm.bind(this)}>
              <p className='tipBtn-wrap flex-center-center'>
                {props.btnText}
              </p>
            </Button>
          </div>
        </div>
      )
    }

  }
}


/**
 * 方法描述：触发alert
 * @param option {Object} 有两个属性：title(标题)、content(内容，可以是jsx)
 */
export default function (option) {
  if (typeof option !== 'object') {
    console.log('option必须是object');
    return;
  }
  if (!option.type) {
    option.type = 'intro';
  }

  if (option.type === 'intro') {
    if (!option.title) {
      console.log('title属性是必须的');
      return;
    }
    if (!option.content) {
      console.log('content属性是必须的');
      return;
    }
  }

  if (option.type === 'tip') {
    if (!option.content) {
      console.log('content属性是必须的');
      return;
    }
  }

  let props = option;
  props.container = document.createElement('div');
  props.container.classList.add('lsd-Alert');
  ReactDOM.render(<Alert {...props} />, props.container);
  document.body.appendChild(props.container);
}