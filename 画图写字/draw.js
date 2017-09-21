//
//
//
//画布宽度
var canvasWidth=0.8*$(window).height();
var canvasHeight=canvasWidth;
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
canvas.width=canvasWidth;
canvas.height=canvasHeight;

draw();
//下方div宽度 跟随画布变化
if($('div').width()>canvasWidth){$('div').css('width',canvasWidth+'px')};

//默认绘画状态 传入参数 选中绘画或者橡皮檫 前者为真 和颜色 橡皮檫为白色
var checkclear=true;
var strokeColor='black';
begindraw(checkclear,strokeColor);

$('#draw').click(function () {
    strokeColor='pink';
    checkclear=true;
    begindraw(checkclear,strokeColor);
});
$('#clear').click(function () {
    checkclear=false;
    strokeColor="white";
    begindraw(checkclear,strokeColor);
});

//初始化的方格
function draw() {
//内部画边框线 画笔会画到边框上，可以选用画布的边框代替   

context.beginPath();
context.strokeStyle='#D6BBBB';
context.lineWidth=1;
context.moveTo(0,0);
context.lineTo(canvasWidth,canvasHeight);
context.moveTo(0,canvasHeight);
context.lineTo(canvasWidth,0);
context.moveTo(canvasWidth/2,0);
context.lineTo(canvasWidth/2,canvasHeight);
context.moveTo(0,canvasHeight/2);
context.lineTo(canvasWidth,canvasHeight/2);
context.stroke();
context.restore();
}

