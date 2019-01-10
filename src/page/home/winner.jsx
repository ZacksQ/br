import React from 'react';
import icon_tip from './icon_tip.png';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default class Winner extends React.Component {
  componentDidMount() {
    this.initSwiper();
  }

  componentDidUpdate() {
    this.initSwiper();
  }

  initSwiper() {
    const data = this.props.data; //中奖名单
    if (this.swiper) return;
    if (!data || data.length === 0) return;
    const config = {
      direction: 'vertical',
      autoplay: true,
      allowTouchMove: false
    };
    if(data.length > 1){
      config.loop = true;
    }
    this.swiper = new Swiper('.swiper-winner', config);
  }

  render() {
    const data = this.props.data; //中奖名单
    return (
      <div className='Winner'>
        {
          data && data.length > 0 && (
            <div className="swiper-container swiper-winner">
              <div className="swiper-wrapper">
                {
                  data.slice(0, 20).map((item, index) => {
                    return (
                      <div key={index} className="swiper-slide winner-slide flex-center-center">
                        <img src={icon_tip} alt="" />
                        {
                          item.type === 1 
                          ? <p className='flex-center'>{item.name}</p>
                          : <p className='flex-center'>恭喜<span className='user ellipsis'>{item.nick}</span>抽中<span className='prize ellipsis'>{item.award_name}</span></p>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}