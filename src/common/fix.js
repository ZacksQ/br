// 可以用于解决滚动穿透 和 ios11中光标错位问题
// css中添加
// body.modal-open {
//   position: fixed;
//   width: 100%;
// }
const ModalHelper = (function(bodyCls) {
  let scrollTop;
  function getScrollTop() {
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    let y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    return y;
  };
  return {
    afterOpen: function() {
      scrollTop = getScrollTop();
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls); 
      window.scrollTo( 0, scrollTop );
    }
  };
})('modal-open');

export default ModalHelper;