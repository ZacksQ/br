import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../page/home';
import Lottery from '../page/lottery';
import Prize from '../page/prize';
import Poster from '../page/poster';
import NotFound from '../page/404';
import Download from '../page/download';

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <Switch key={location.pathname} location={location}>
        {/* 首页 */}
        <Route exact path="/" component={Home} />
        {/* 抽奖 */}
        <Route exact path="/lottery" component={Lottery} />
        {/* 中奖 */}
        <Route exact path="/prize/:name/:sponsors" component={Prize} />
        {/* 海报 */}
        <Route exact path="/poster/:prize" component={Poster} />
        {/* 下载 */}
        <Route exact path="/download" component={Download} />
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    )
  }
}
export default withRouter(App);