///////////////////////////////
///////////////////////////////
// 画笔状态 绘画或者橡皮檫/////
///////////////////////////////
function begindraw(clear,color) {

  var isMousedown=false;
  var Lastloc={x:0,y:0};
  var Lasttime=0;
  var LastLineWidth=-1;
  var line=1;
  //选择颜色
  $('#draw,#clear').removeClass('checked');
  if (clear) {//获取颜色框的背景色 赋值给画笔
      $('.btn').click(function (e) {
          $('.btn').removeClass('btn-checked');
          $(this).addClass('btn-checked');
          color=$(this).css('background-color');
      });
      $('#draw').addClass('checked');
  }else{
      $('#clear').addClass('checked');
  }
  canvas.onmousedown=function (e) {
      e.preventDefault();
      isMousedown=true;
      //鼠标按下时的坐标
      Lastloc=windowToCanvas(e.clientX,e.clientY);
      //鼠标按下时的时间
      Lasttime=new Date().getTime();
  };

  canvas.onmouseup=function (e) {
      e.preventDefault();
      isMousedown=false;
  };

  canvas.onmouseout=function (e) {
      e.preventDefault();
      isMousedown=false;
  };

  canvas.onmousemove=function (e) {
      e.preventDefault();
      if (isMousedown) {
          //获得鼠标移动动态的坐标
            var curloc=windowToCanvas(e.clientX,e.clientY);
          //获得两点的距离  
            var s=length(curloc,Lastloc);
            var curtime=new Date().getTime();
          //两点的时间  
            var t=curtime-Lasttime;
          //画笔宽度  
            if (clear) {//绘画时
                line=locLineWidth(t,s,pensize);
            }else{//橡皮檫
                line=30;
            };
            console.log(line);
            context.beginPath();
            context.moveTo(Lastloc.x,Lastloc.y);
            context.lineTo(curloc.x,curloc.y);
            context.lineWidth=line;
            context.lineCap="round";//线条圆滑
            //context.lineJoin="round";
            context.strokeStyle=color;
            context.stroke();
          //实时更新各项数值  
            Lastloc=curloc;
            Lasttime=curtime;
            LastLineWidth=line;
            if (!clear){
             draw();
            }
      }
  };
  //清除按钮
  $('.button').click(function (e) {
      context.clearRect(0,0,canvasWidth,canvasWidth);
      draw();
  });

  //画笔宽度随速度变化 可调节

  function locLineWidth(t,s,Lsize) {
      var v=s/t;
      var resultLineWidth;
      if (v<=0.1) {
          resultLineWidth=Lsize;
      }else if (v>=10) {
          resultLineWidth=3;
      }else{
          resultLineWidth=Lsize-(v-0.1)/(10-0.1)*(Lsize-3);
      };
      if (LastLineWidth==-1) {
          return resultLineWidth;
      };
      return LastLineWidth*1/3+ resultLineWidth*2/3;
      //return resultLineWidth;
  };
  //鼠标移动时当前点与上一点的距离
  function length(loc1,loc2) {
      return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
  };
  //鼠标相对画布初始化的坐标
  function windowToCanvas(x,y) {
      var bbox=canvas.getBoundingClientRect();//与最近容器的距离
      return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)};
  }
};
//获取画笔粗细
var pensize=1;
$('.pen').hover(function() {
        $('li').show();
$('li').click(
    function () {
        $(this).siblings().hide();
        pensize=$(this).val();
    })
});