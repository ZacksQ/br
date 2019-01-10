import React from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default class Supports extends React.Component {

  componentDidMount() {
    this.swiper = new Swiper('.swiper-supports', {
      autoplay: {
        delay: 0,
      },
      speed: 1000,
      loop: true,
      slidesPerView: 'auto',
      allowTouchMove: false
    });
  }

  render() {
    const props = this.props;
    return (
      <div className={'Supports ' + props.clName}>
        <div className="swiper-container swiper-supports">
          <div className="swiper-wrapper">
            {
              props.data.map(item => {
                return (
                  <div key={item.pic} className="swiper-slide supports-slide">
                    <img src={item.pic} alt="" />
                    <p>{item.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

Supports.defaultProps = {
  clName: '', //dom类名
  data: []
};