import React from 'react';
import './index.scss';
import dotImg from './tag-bg.png';

export default class TagWrap extends React.Component {

  removeTag(item){
    this.props.removeTag && this.props.removeTag(item)
  }

  render() {
    const { tags, bigLength } = this.props; //标签列表,长标签个数

    if (bigLength === 0) {
      return (
        <div className='TagWrap flex-center-around'>
          <img className='dotImg' src={dotImg} alt=""/>
          {
            Array.from({ length: 3 }).map((item, index) => {
              if (tags[index]) {
                return <img key={index} className='small' src={tags[index].img} alt="" onClick={this.removeTag.bind(this, tags[index])} />
              } else {
                return <div key={index} className='small-empty'></div>
              }
            })
          }
        </div>
      )
    } else {
      if (tags[0].type === 'small') {
        return (
          <div className='TagWrap flex-center-around type1'>
            <img className='dotImg' src={dotImg} alt=""/>
            <img className='small' src={tags[0].img} alt="" />
            <div className='big-wrap'>
              {
                [1, 2].map(item => {
                  if (tags[item]) {
                    return <img key={item} className='big' src={tags[item].img} alt="" onClick={this.removeTag.bind(this, tags[item])}/>
                  } else {
                    return <div key={item} className='big-empty'></div>
                  }
                })
              }
            </div>
          </div>
        )
      } else {
        let bigTag = [], smallTag = [];
        tags.forEach(item => {
          if (item.type === 'big') {
            bigTag.push(item);
          } else {
            smallTag.push(item);
          }
        })
        return (
          <div className='TagWrap flex-center-around type1'>
            <img className='dotImg' src={dotImg} alt=""/>
            <div className='big-wrap'>
              {
                Array.from({ length: 2 }).map((item, index) => {
                  if (bigTag[index]) {
                    return <img key={index} className='big' src={bigTag[index].img} alt="" onClick={this.removeTag.bind(this, bigTag[index])}/>
                  } else {
                    return <div key={index} className='big-empty'></div>
                  }
                })
              }
            </div>
            {
              smallTag.length > 0 ? <img className='small' src={smallTag[0].img} alt="" onClick={this.removeTag.bind(this, smallTag[0])} /> : <div className='small-empty'></div>
            }
          </div>
        )
      }
    }
  }
}