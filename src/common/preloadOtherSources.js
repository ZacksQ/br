import { AlertImg } from '../component/alert';
import { LotteryImg } from '../page/lottery';
import { PrizeImg } from '../page/prize';
import { ConfigImg } from '../page/prize/config/config.js';
import { PosterImg } from '../page/poster';
import env from './env';
import Preloader from './preloader';

export default function preloadOtherSources(){
  const resources = AlertImg.concat(LotteryImg).concat(PrizeImg).concat([ConfigImg[env.getTodayNum()]]).concat(PosterImg);
  let preloader = new Preloader({
    resources: resources,
    concurrency: 1,
    perMinTime: 0 // 加载每个资源所需的最小时间
  });
  preloader.start();
}