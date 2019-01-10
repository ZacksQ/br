import React from 'react';
import ReactDOM from 'react-dom';
import env from '../../common/env';
import './loadPage.scss';


import bodyBg from '../../assets/bg.jpg';
import logo from './logo.png';
import theme from './theme.png';
import help from './help.png';
import ticket from './ticket.png';
import koubei from './koubei.png';
import fiveYears from './fiveYears.png';
import aboutLsd from './aboutLsd.png';
import winners from './winners.png';
import intro from './intro.png';
import save from './save.png';
import jinhui from './jinhui.png';
import laigongyi from './laigongyi.png';
import lsdPhoto from './lsdPhoto.png';
import prizeTitle from './prizeTitle.png';

//首页首屏的其他资源
import photo1 from '../../component/photo/photo1.jpg';
import desc from '../../component/photo/desc.png';
import titleBg from '../../assets/title.png';
import winnerBg from './winner.png';
import helpBg from './help-bg.png';

const HomeImg = [titleBg, logo, winnerBg, theme, help, helpBg, ticket, koubei, fiveYears, aboutLsd, winners, intro, save, jinhui, laigongyi, lsdPhoto, prizeTitle, photo1, desc];

class Load extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0
    }
  }

  componentDidMount() {
    env.preload({
      resources: [bodyBg],
      onComplete: () => {
        this.loadPreAssets();
      }
    });
  }

  //加载图片资源
  loadPreAssets() {
    env.preload({
      resources: HomeImg,
      onProgress: (loaded, length) => {
        const percent = Math.floor(loaded / length * 95);
        this.setState({ percent });
      },
      onComplete: async () => {
        this.props.onComplete && await this.props.onComplete();
        // this.props.destroy && this.props.destroy();
      }
    });
  }

  render() {
    const { percent } = this.state;
    return (
      <div className='Img-loading flex-column-center-center fixed'>
        <div className='percent'>
          <p className='current' style={{ left: `${percent}%` }}>{percent}%</p>
          <div className='line'>
            <p className='active' style={{ width: `${percent}%` }}></p>
          </div>
        </div>
      </div>
    )
  }
}

export default class LoadPage {
  container = null;
  constructor(props) {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    ReactDOM.render(<Load {...props} destroy={this.destroy.bind(this)} />, this.container);
  }
  destroy() {
    ReactDOM.unmountComponentAtNode(this.container);
    this.container.remove();
  }
}