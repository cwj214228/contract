/**
 * 画布
 * @author zjy 2019.5.31
 */

//绘画
function drawCanvas(canvas) {
  //绘画签名
  var ctx = canvas.getContext('2d');

 
  //电脑 
  canvas.onmousedown = function(e) {
    console.log('yes');
    //计算鼠标在画布的距离
    var disX = e.clientX - canvas.offsetLeft
    var disY = e.clientY - canvas.offsetTop
    ctx.beginPath();
    
    //设置画线的宽，与颜色
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';

    //设置画的起始点
    ctx.moveTo(disX, disY)
    
    document.onmousemove = function(e) {
      var disX = e.clientX - canvas.offsetLeft
      var disY = e.clientY - canvas.offsetTop
      //移动时设置画线的结束位置。并且显示
      ctx.lineTo(disX, disY) //鼠标点下去的位置
      ctx.stroke()
    }

    //鼠标离开时清空鼠标按下与移动事件，停止画
    document.onmouseup = function() {
      document.onmousedown = null //鼠标放开的位置
      document.onmousemove = null
    }

  }
  
  //手机
  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    // alert('yes');
    //计算鼠标在画布的距离
    var disX = e.touches[0].clientX - canvas.offsetLeft
    var disY = e.touches[0].clientY - canvas.offsetTop
    ctx.beginPath();
    
    //设置画线的宽，与颜色
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';

    //设置画的起始点
    ctx.moveTo(disX, disY)
    
    canvas.addEventListener('touchmove', function(e) {
      e.preventDefault();
      var disX = e.touches[0].clientX - canvas.offsetLeft
      var disY = e.touches[0].clientY - canvas.offsetTop
      //移动时设置画线的结束位置。并且显示
      ctx.lineTo(disX, disY) //鼠标点下去的位置
      ctx.stroke()
    }, false);
    
  }, false)
}

//清空画布
function clearCanvas(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
}