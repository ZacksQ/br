import React from 'react';

export default class Supports extends React.Component {

  state = {
    show: false, // 是否显示在屏幕上了
  }

  componentDidMount() {
    //监听页面滚动
    this.addScrollListen();
  }

  componentWillUnmount() {
    this.stop = true;
    if(this.check){
      window.removeEventListener('scroll', this.check);
    }
  }

  getScrollTop() {
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    let y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    return y;
  }

  //监听滚动，判断是否显示
  addScrollListen() {
    //判断是否显示助力企业
    const node = document.querySelector('.Supports');
    const offsetTop = node.offsetTop;
    const height = document.documentElement.clientHeight;

    this.check = () => {
      const scrollTop = this.getScrollTop();
      if (scrollTop > offsetTop - height) {
        this.setState({
          show: true
        }, () => {
          this.stopTouch();
          //当内容展示出来，1s后开始滚动
          setTimeout(()=>{
            this.run();
          }, 1000);
        });
        window.removeEventListener('scroll', this.check);
      }
    };

    window.addEventListener('scroll', this.check);
  }

  //禁止手动滚动
  stopTouch() {
    const node = document.querySelector('.supports-container');
    node.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, {
        passive: false
      });
  }

  //滚动函数
  run() {
    if (this.stop) return;
    const node = document.querySelector('.supports-container');
    window.requestAnimationFrame(() => {
      const scrollWidth = node.scrollWidth / 2;
      const left = node.scrollLeft;
      const width = node.offsetWidth;
      if (left < scrollWidth + width) {
        node.scrollLeft = left + 1;
      } else {
        node.scrollLeft = left - scrollWidth;
      }
      this.run();
    })
  }

  render() {
    const props = this.props;
    return (
      <div className={'Supports ' + props.clName}>
        <div className="supports-container">
          {
            this.state.show && (
              <div className="supports-wrapper">
                {
                  props.data.map(item => {
                    return (
                      <div key={item.pic} className="supports-slide">
                        <img src={item.pic} alt="" />
                        <p>{item.name}</p>
                      </div>
                    )
                  })
                }
                {
                  props.data.map(item => {
                    return (
                      <div key={item.pic} className="supports-slide">
                        <img src={item.pic} alt="" />
                        <p>{item.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

Supports.defaultProps = {
  clName: '', //dom类名
  data: []
};