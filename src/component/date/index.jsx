import React from 'react';
import './index.scss';
import chelunLogo from './chelunLogo.png';

const number = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一'];
const weekday = [{
  en: 'Sun',
  cn: '星期日'
}, {
  en: 'Mon',
  cn: '星期一'
}, {
  en: 'Tue',
  cn: '星期二'
}, {
  en: 'Wed',
  cn: '星期三'
}, {
  en: 'Thu',
  cn: '星期四'
}, {
  en: 'Fri',
  cn: '星期五'
}, {
  en: 'Sat',
  cn: '星期六'
}];

export default function (props = {}) {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const dateStr = `${number[month]}月${number[date - 1]}日`;
  const week = time.getDay();

  if (!props.type || props.type === 'default') {
    return (
      <div className='Date flex-column-center-between'>
        <div className='flex-column-center'>
          <p className='year'>二〇一九年</p>
          {
            dateStr.length > 5
              ? (
                <React.Fragment>
                  <p className='day'>{dateStr.split('月')[0]}月</p>
                  <p className='day'>{dateStr.split('月')[1]}</p>
                </React.Fragment>
              )
              : <p className='day'>{number[month]}月{number[date - 1]}日</p>
          }
        </div>
        <p className='week flex-between'>
          <span>{weekday[week].cn}</span>
          <span>{weekday[week].en}</span>
        </p>
      </div>
    )
  }

  if (props.type === 'poster') {
    return (
      <div className='Date Date-poster flex-column-center-between'>
        <div className='flex-column-start'>
          <p className='year'>
            <img src={chelunLogo} alt=""/>
          </p>
          <p className='day'>二〇一九年</p>
          <p className='day'>{number[month]}月{number[date - 1]}日</p>
        </div>
        <p className='week flex-between'>
          <span>{weekday[week].cn}</span>
          <span>{weekday[week].en}</span>
        </p>
      </div>
    )
  }

}