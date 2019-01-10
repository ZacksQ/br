import React from 'react';
import './index.scss';
import desc from './desc.png';
import photo1 from './photo1.jpg';
import photo2 from './photo2.jpg';
import photo3 from './photo3.jpg';
import photo4 from './photo4.jpg';
import photo5 from './photo5.jpg';
import photo6 from './photo6.jpg';
import photo7 from './photo7.jpg';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import env from '../../common/env';

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];

export default class Photo extends React.Component {
  state = {}

  componentDidMount() {
    env.preload({
      resources: [photo1, photo2, photo3, photo4, photo5, photo6, photo7, desc],
      onComplete: ()=>{
        this.initSwiper();
      }
    });
  }

  initSwiper() {
    if (this.state.activeIndex !== undefined) return;
    this.swiper = new Swiper('.swiper-photo', {
      autoplay: true
    });
  }

  //注销swiper
  destroy() {
    this.setState({
      activeIndex: this.swiper.activeIndex
    }, () => {
      if(this.swiper){
        this.swiper.destroy();
      }
    });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <div className='Photo flex-between'>
        {
          activeIndex !== undefined
            ? (
              <div className="swiper-container swiper-photo">
                <div className="swiper-wrapper">
                  <div className="swiper-slide photo-slide">
                    <img src={photos[activeIndex]} alt="" />
                  </div>
                </div>
              </div>
            )
            : (
              <div className="swiper-container swiper-photo">
                <div className="swiper-wrapper">
                  {
                    photos.map(item => {
                      return (
                        <div key={item} className="swiper-slide photo-slide">
                          <img src={item} alt="" />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
        }
        <div className='desc'>
          <img src={desc} alt="" />
        </div>
      </div>
    )
  }
}