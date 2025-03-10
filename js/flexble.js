(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // 设置 em 默认字体所对应的大小
  function setBodyFontSize() {
      if (document.body) {
          document.body.style.fontSize = 12 * dpr + "px";
      } else {
          document.addEventListener("DOMContentLoaded", setBodyFontSize);
      }
  }
  setBodyFontSize();

  // 将视窗分为多少份
  // set 1rem = viewWidth / 10
  function setRemUnit() {
      var rem = docEl.clientWidth / 10;
      docEl.style.fontSize = rem + "px";

      setAspectRatio();
  }

  function setAspectRatio() {
      const aspectRatio = 16 / 9;
      const width = docEl.clientWidth;
      const calculatedHeight = width / aspectRatio;
      docEl.style.height = calculatedHeight + "px";
      
      // 如果计算后的高度大于视口高度，则调整为视口高度并锁定比例
      if (calculatedHeight > window.innerHeight) {
          docEl.style.height = "100vh";
          const adjustedWidth = window.innerHeight * aspectRatio;
          docEl.style.width = adjustedWidth + "px";
          docEl.style.marginLeft = (window.innerWidth - adjustedWidth) / 2 + "px"; // 居中显示
      } else {
          docEl.style.width = "100%";
          docEl.style.marginLeft = "0";
      }
  }

  setRemUnit();

  // 当页面发生改变时，重新设置 rem 所对应的刻度值和宽高比
  window.addEventListener("resize", function() {
      setRemUnit();
      setAspectRatio();
  });
  window.addEventListener("pageshow", function(e) {
      if (e.persisted) {
          setRemUnit();
          setAspectRatio();
      }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
      var fakeBody = document.createElement("body");
      var testElement = document.createElement("div");
      testElement.style.border = ".5px solid transparent";
      fakeBody.appendChild(testElement);
      docEl.appendChild(fakeBody);
      if (testElement.offsetHeight === 1) {
          docEl.classList.add("hairlines");
      }
      docEl.removeChild(fakeBody);
  }
})(window, document);