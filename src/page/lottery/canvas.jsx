import React from 'react';
import anime from 'animejs'

export default class Canvas extends React.Component {

  static defaultProps = {
    start: null,
    end: null
  }

  componentDidMount() {
    //设置canvas
    let canvas = document.getElementById('my-canvas');
    this.ctx = canvas.getContext('2d');

    canvas.addEventListener('touchstart', this.touchStart.bind(this), {
      passive: false
    });

    canvas.addEventListener('touchmove', this.touchMove.bind(this), {
      passive: false
    });

    canvas.addEventListener('touchend', this.touchEnd.bind(this), {
      passive: false
    });
  }

  //开始移动
  touchStart(e) {
    e.preventDefault();
    if (this.draw) return;
    this.isDown = true;
    const { x, y } = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };

    //直线
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);

    //触发开始事件
    this.props.start && this.props.start();
  }

  //移动中
  touchMove(e) {
    e.preventDefault();
    if (this.draw) return;
    if (!this.isDown) return;

    const { x, y } = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };

    //直线
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = '#2c3a60';
    this.ctx.lineWidth = 8;
    this.ctx.stroke();
  }

  //移动结束
  touchEnd() {
    //绘制结束
    if (this.draw) return;
    if (!this.isDown) return;
    this.draw = true;

    //开始缩放动画
    this.startMotion();
    this.props.end && this.props.end();
  }

  //开始缩小到签纸上
  startMotion() {
    let allCallbacks = anime({
      targets: '#my-canvas',
      scale: 0.33,
      translateY: '-100px'
    });
    allCallbacks.complete = () => {
      //触发结束时间
      this.props.motionEnd && this.props.motionEnd();
    };
  }

  render() {
    const width = document.documentElement.clientWidth;
    return (
      <canvas
        id='my-canvas'
        width={Math.max(Math.min(width, 540), 320)}
        height={document.documentElement.clientHeight}
      ></canvas>
    )
  }
}