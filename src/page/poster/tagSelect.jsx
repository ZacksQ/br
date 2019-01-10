import React from 'react';
import './index.scss';
import Button from '@material-ui/core/Button';

import tag1 from './tag1.jpg';
import tag2 from './tag2.jpg';
import tag3 from './tag3.jpg';
import tag4 from './tag4.jpg';
import tag5 from './tag5.jpg';
import tag6 from './tag6.jpg';
import tag7 from './tag7.jpg';
import tag8 from './tag8.jpg';
import tag9 from './tag9.jpg';
import tag10 from './tag10.jpg';
import icon_left from './icon_left.png';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export const TagImg = [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9, tag10, icon_left];

const tags = [
  {
    id: 1,
    img: tag1,
    type: 'big'
  },
  {
    id: 5,
    img: tag5,
    type: 'small'
  },
  {
    id: 6,
    img: tag6,
    type: 'small'
  },
  {
    id: 2,
    img: tag2,
    type: 'big'
  },
  {
    id: 7,
    img: tag7,
    type: 'small'
  },
  {
    id: 8,
    img: tag8,
    type: 'small'
  },
  {
    id: 3,
    img: tag3,
    type: 'big'
  },
  {
    id: 9,
    img: tag9,
    type: 'small'
  },
  {
    id: 10,
    img: tag10,
    type: 'small'
  },
  {
    id: 4,
    img: tag4,
    type: 'big'
  },
]

export default class TagSelect extends React.Component {
  componentDidMount() {
    this.swiper = new Swiper('.swiper-tags', {
      slidesPerView: 'auto'
    });
  }

  render() {
    return (
      <div className='TagSelect flex-between'>
        <Button className='icon' onClick={() => {
          this.swiper.slidePrev();
        }}>
          <img className='icon-left' src={icon_left} alt="" />
        </Button>
        <div className="swiper-container swiper-tags">
          <div className="swiper-wrapper">
            {
              tags.map(item => {
                return (
                  <div key={item.id} className={"swiper-slide tags-slide" + (item.type === 'big' ? ' big' : '')} onClick={() => {
                    //百度统计
                    window._hmt.push(['_trackEvent', '车轮蓝丝带', '爱心标签' + item.id + '点击']);
                    this.props.select(item)
                  }}>
                    <Button>
                      <img src={item.img} alt="" />
                    </Button>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Button className='icon' onClick={() => {
          this.swiper.slideNext();
        }}>
          <img className='icon-right' src={icon_left} alt="" />
        </Button>
      </div>
    )
  }
}