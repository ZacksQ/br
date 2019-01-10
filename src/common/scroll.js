/**
 * 方法描述：scroll.init()初始化 只支持页面滚动，dom内的滚动不支持
 * @property {func} init @param onReachBottom 触底回调
 *                       @param onReachBottomDistance 距离底部多远开始触发回调，默认100px
 * @property {func} remove 关闭滚动监听
 */
const scroll = {
  onReachBottom: null,
  onReachBottomDistance: null,
  getScrollTop() {
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    let y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    return y;
  },
  onScroll() {
    //获取滚动位置
    let scrollTop = this.getScrollTop();
    //获取窗口高度
    let height = document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
    //获取页面高度
    let scrollHeight = document.body.scrollHeight;
    if (scrollHeight > height && scrollTop + height + this.onReachBottomDistance > scrollHeight) {
      this.onReachBottom();
    }
  },
  // onReachBottomDistance 由原来的默认50改为100
  // 原因： 在vivo全面屏浏览器上，标题栏是会随着页面滚动而滚动的，且标题栏滚动时，页面scrollTop不会改变
  init(onReachBottom = () => {}, onReachBottomDistance = 100) {
    this.onReachBottom = onReachBottom;
    this.onReachBottomDistance = onReachBottomDistance;
    window.onscroll = this.onScroll.bind(this);
  },
  remove() {
    window.onscroll = null;
  }
};

export default scroll;