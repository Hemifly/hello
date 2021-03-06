
var canvas=document.getElementById('canvas');
ctx=canvas.getContext('2d');
ctx.strokeStyle='silver';
var me=true;//代表我方开始

//初始化方格 表示都没有落子
var canvasBoard=[];
for(var i=0;i<15;i++){
    canvasBoard[i]=[];
    for(var j=0;j<15;j++){
        canvasBoard[i][j]=0;
    }
}

//三维数组
//赢法数组
var wins=[];
for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}

var count=0;
//横向赢法 x=11 * y=15 =165种
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i][j+k][count]=true;
        }
        count++;
    }
}
console.log(count);//165
//纵向
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[j+k][i][count]=true;
        }
        count++;
    }
}
console.log(count);//330
//斜向
for(var i=0;i<11;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}
console.log(count);//451
//反斜向
for(var i=0;i<11;i++){
    for(var j=14;j>3;j--){
        for(var k=0;k<5;k++){
            wins[i+k][j-k][count]=true;
        }
        count++;
    }
}
console.log(count);//572

//赢法的统计数组
var myWin=[];
var computerWin=[];
//初始化
for(i=0;i<count;i++){
   myWin[i]=0;
   computerWin[i]=0;
}

//绘制方格
function star(){
    for (var i=0; i <15; i++) {
        ctx.moveTo(15+i*30,15);
        ctx.lineTo(15+i*30,435);
        ctx.stroke();
        ctx.moveTo(15,15+i*30);
        ctx.lineTo(435,15+i*30);
        ctx.stroke();
   }
}
star();

//落子函数
var oneStep=function (i,j,me) {
    ctx.beginPath();
    ctx.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    ctx.closePath();
    var grd=ctx.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
    if (me) {//我方落子
        grd.addColorStop(0,"#0A0A0A");
        grd.addColorStop(1,"#636766");
    }else{//电脑落子
        grd.addColorStop(0,"#D1D1D1");
        grd.addColorStop(1,"#F9F9F9");
    }
    ctx.fillStyle=grd;
    ctx.fill();
}

var over=false;
canvas.onclick=function (e) {
    if (over) {
        return;
    }
    if (!me) {
        return
    }
    //获取点击位置的坐标按30一格子向下取整
    var x=e.offsetX;
    var y=e.offsetY;
    var i=Math.floor(x/30);
    var j=Math.floor(y/30);
    if(canvasBoard[i][j]==0){
       oneStep(i,j,me);
       canvasBoard[i][j]=1;
        for(var k=0;k<count;k++){
            //如果i,j位置落子 那么这个位置的赢法就++
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k]=6;
                if (myWin[k]==5) {
                    alert('你赢了');
                    over=true;
                }
            }
        }
        if (!over) {
            me=!me;
            computerAI();
        }
    }
}

var computerAI=function () {
    var myScore=[];//我的权重
    var computerScore=[];//
    var max=0;
    var u=0,v=0;
    for(var i=0;i<15;i++){
        myScore[i]=[];
        computerScore[i]=[];
        for(var j=0;j<15;j++){
            myScore[i][j]=0;
            computerScore[i][j]=0;
        }
    }
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if (canvasBoard[i][j]==0) {
                for(var k=0;k<count;k++){
                    if (wins[i][j][k]) {
                        if (myWin[k]==1) {
                            myScore[i][j]+=200;
                        }else if (myWin[k]==2) {
                            myScore[i][j]+=400;
                        }else if (myWin[k]==3) {
                            myScore[i][j]+=2000;
                        }else if (myWin[k]==4) {
                            myScore[i][j]+=10000;
                        }
                        if (computerWin[k]==1) {
                            computerScore[i][j]+=220;
                        }else if (computerWin[k]==2) {
                            computerScore[i][j]+=420;
                        }else if (computerWin[k]==3) {
                            computerScore[i][j]+=2100;
                        }else if (computerWin[k]==4) {
                            computerScore[i][j]+=20000;
                        }
                    }
                }
                if (myScore[i][j]>max) {
                    max=myScore[i][j];
                    u=i;
                    v=j;
                }else if (myScore[i][j]==max) {
                    if (computerScore[i][j]>computerScore[u][v]) {
                        u=i;
                        v=j;
                    }
                }
                if (computerScore[i][j]>max) {
                    max=computerScore[i][j];
                    u=i;
                    v=j;
                }else if (computerScore[i][j]==max) {
                    if (myScore[i][j]>myScore[u][v]) {
                        u=i;
                        v=j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    canvasBoard[u][v]=2;
    for(var k=0;k<count;k++){
        //如果i,j位置落子 那么这个位置的赢法就++
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k]=6;
            if (computerWin[k]==5) {
                alert('计算机赢了');
                over=true;
            }
        }
    }
    if (!over) {
        me=!me;
    }  
}