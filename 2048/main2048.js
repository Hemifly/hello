
var board=[];

var score=0;

var hasConficted=[];//

var startx=0;
var starty=0;
var endx=0;
var endy=0;
//游戏开始
$(function () {
    prepareForMobile();
    newgame();
});

function prepareForMobile() {
    //检测屏幕宽度 过宽用默认 pc端
    if (documentWidth>500) {
        gridContainerWidth=500;
        cellSpace=20;
        cellSideLength=100;
    }
    //移动端
    $("#grid-container").css("width",gridContainerWidth-2*cellSpace);
    $("#grid-container").css("height",gridContainerWidth-2*cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",gridContainerWidth*0.02);

    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",cellSideLength*0.02);

}

function newgame() {
    init();//初始化棋盘
    //随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

//初始化棋盘
function init() {
    for (var i=0;i<4;i++) {
        for(var j=0;j<4;j++){
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }
    //初始化格子默认没有碰撞
    for(var i=0;i<4;i++){
        board[i]=[];
        hasConficted[i]=[];
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConficted[i][j]=false;
        }
    }
    updateBoardView();//生成格子

    score=0; //分数
    updateScore(score);
}

//生成div 并加上样式 默认不可见
function updateBoardView() {
    $('.number-cell').remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){//创建格子
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var zheNumberCell=$('#number-cell-'+i+'-'+j);
        if (board[i][j]==0) {//初始不可见
            zheNumberCell.css('width','0px');
            zheNumberCell.css('height','0px');
            zheNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
            zheNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
        }else{//后续生成的格子添加新的样式
            zheNumberCell.css('width',cellSideLength);
            zheNumberCell.css('height',cellSideLength);
            zheNumberCell.css('top',getPosTop(i,j));//格子定位
            zheNumberCell.css('left',getPosLeft(i,j));//背景色
            zheNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
            zheNumberCell.css('color',getNumberColor(board[i][j]));//前景色
            zheNumberCell.text(board[i][j]);//文字
        }

        hasConficted[i][j]=false;//重置碰撞
        }

    }
    $(".number-cell").css("line-height",cellSideLength+'px');
    $(".number-cell").css("font-size",0.6*cellSideLength+'px');
}

//生成格子
function generateOneNumber() {
    
    //判断当前是否还有空格子
    if (nospace(board)) {
        return false;
    }
    //随机一个位置
    var randx= parseInt(Math.floor(Math.random() *4));
    var randy= parseInt(Math.floor(Math.random() *4));

    var times=0;
    while(times<50){//生成的坐标内是否为空 直到寻找到空格子才跳出循环
        if (board[randx][randy]==0) {
            break;
        }
        var randx= parseInt(Math.floor(Math.random() *4));
        var randy= parseInt(Math.floor(Math.random() *4));
        times++;
    }
    if (times==50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j <.4; j++) {
               if (board[i][j]==0) {
                randx=i;
                randy=j;
               }
            }
        }
    }
    //随机一个数
    var randNumber=Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);//显示生成的格子
    return true;
}

//pc端
$(document).keydown(function (envet) {

    switch(envet.keyCode){
        case 37://判断移动是否生效
            event.preventDefault();
            if (moveLeft()) {
                setTimeout('generateOneNumber()',210);//生成格子
                setTimeout('isgameover()',300);//判断游戏是否结束

            }
            break;
        case 38:
            event.preventDefault();
            if (moveUp()) {
                setTimeout('generateOneNumber()',210);//生成格子
                setTimeout('isgameover()',300);//判断游戏是否结束

            }
            break;
        case 39:
            event.preventDefault();
            if (moveRight()) {
                setTimeout('generateOneNumber()',210);//生成格子
                setTimeout('isgameover()',300);//判断游戏是否结束

            }
            break;
        case 40:
            event.preventDefault();
            if (moveDown()) {
                setTimeout('generateOneNumber()',210);//生成格子
                setTimeout('isgameover()',300);//判断游戏是否结束

            }
            break;
        default:
            break;
    }
});

//移动端
document.addEventListener("touchstart",function (event) {
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});

document.addEventListener("touchmove",function (event) {
    event.preventDefault();//解决谷歌bug
})

document.addEventListener("touchend",function (event) {
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;
    var deltax=endx-startx;
    var deltay=endy-starty;
    if (Math.abs(deltax)< 0.3*documentWidth && Math.abs(deltay) <0.3*documentWidth) 
        return;
    if (Math.abs(deltax)>Math.abs(deltay)) {
        if (deltax>0) {
            //move right
            if (moveLeft()) {
                setTimeout('generateOneNumber()',210);//生成格子
                setTimeout('isgameover()',300);//判断游戏是否结束

            }
        }
        else{
            //move left
            if (moveRight()) {
                setTimeout('generateOneNumber()',210);//生成格子
                setTimeout('isgameover()',300);//判断游戏是否结束

            }
        }
    }else {
        if (deltay>0) {
            //move down
            if (moveDown()) {
                setTimeout('generateOneNumber()',210);//生成格子
                setTimeout('isgameover()',300);//判断游戏是否结束

            }
        }
        else{
            //move up
            if (moveUp()) {
                setTimeout('generateOneNumber()',210);//生成格子
                setTimeout('isgameover()',300);//判断游戏是否结束

            }
        }
    }

});

function isgameover() {
    if (nospace(board)&&
        nomove(board)) {
        gameover();
    }
    
}

function gameover() {
    alert("gameover");
}
//左移动函数
function moveLeft() {
    if (!canMoveLeft(board)) //判断是否能够移动
        return false;
    
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if (board[i][j]!=0) {//当前位置是否有元素
                for(var k=0;k<j;k++){//遍历当前元素前面的所有元素 如果存在空的并且中间无障碍
                    if (board[i][k]==0&&noBlockHorizontal(i,k,j,board)) {
                        //move           //判断是否有障碍函数
                        showMoveAnimation(i,j,i,k);//移动
                        board[i][k]=board[i][j];//置换
                        board[i][j]=0;//清空
                        continue;
                    }//数字相等且无障碍
                    else if (board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConficted[i][k]) {
                        //move
                        //add
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];//数字相加
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        scoreshow(score);
                        hasConficted[i][k]=true;
                        continue;
                    }
                }
        
            }
        }
    }
    setTimeout("updateBoardView()",200);//刷新页面
    return true; 
        
}

function moveRight() {
    if (!canMoveRight(board)) //判断是否能够移动
        return false;
    
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if (board[i][j]!=0) {//当前位置是否有元素
                for(var k=3;k>j;k--){//遍历当前元素前面的所有元素 如果存在空的并且中间无障碍
                    if (board[i][k]==0&&noBlockHorizontal(i,j,k,board)) {
                        //move           //判断是否有障碍函数
                        showMoveAnimation(i,j,i,k);//移动
                        board[i][k]=board[i][j];//置换
                        board[i][j]=0;//清空
                        continue;
                    }//数字相等且无障碍
                    else if (board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConficted[i][k]) {
                        //move
                        //add
                        showMoveAnimation(i,j,i,k);
                        board[i][k]*=2;//数字相加
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        scoreshow(score);
                        hasConficted[i][k]=true;
                        continue;
                    }
                }
        
            }
        }
    }
    setTimeout("updateBoardView()",200);//刷新页面
    return true; 
        
}


function moveUp() {
    if (!canMoveUp(board)) //判断是否能够移动
        return false;
    
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if (board[i][j]!=0) {//当前位置是否有元素
                for(var k=0;k<i;k++){//遍历当前元素前面的所有元素 如果存在空的并且中间无障碍
                    if (board[k][j]==0&&noBlockVertital(j,k,i,board)) {
                        //move           //判断是否有障碍函数
                        showMoveAnimation(i,j,k,j);//移动
                        board[k][j]=board[i][j];//置换
                        board[i][j]=0;//清空
                        continue;
                    }//数字相等且无障碍
                    else if (board[k][j]==board[i][j]&&noBlockVertital(j,k,i,board)&&!hasConficted[k][j]) {
                        //move
                        //add
                        showMoveAnimation(i,j,k,j);
                        board[k][j]*=2;//数字相加
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        scoreshow(score);
                        hasConficted[k][j]=true;
                        continue;
                    }
                }
        
            }
        }
    }
    setTimeout("updateBoardView()",200);//刷新页面
    return true; 
        
}

function moveDown() {
    if (!canMoveDown(board)) //判断是否能够移动
        return false;
    
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){noBlockVertital
            if (board[i][j]!=0) {//当前位置是否有元素
                for(var k=3;k>i;k--){//遍历当前元素前面的所有元素 如果存在空的并且中间无障碍
                    if (board[k][j]==0&&noBlockVertital(j,i,k,board)) {
                        //move           //判断是否有障碍函数
                        showMoveAnimation(i,j,k,j);//移动
                        board[k][j]=board[i][j];//置换
                        board[i][j]=0;//清空
                        continue;
                    }//数字相等且无障碍
                    else if (board[k][j]==board[i][j]&&noBlockVertital(j,i,k,board)&&!hasConficted[k][j]) {
                        //move
                        //add
                        showMoveAnimation(i,j,k,j);
                        board[k][j]*=2;//数字相加
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        scoreshow(score);
                        hasConficted[k][j]=true;
                        continue;
                    }
                }
        
            }
        }
    }
    setTimeout("updateBoardView()",200);//刷新页面
    return true; 
        
}