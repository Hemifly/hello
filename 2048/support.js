//////////////
//移动端缩放//
documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;
//返回 上 左的坐标
function getPosTop(i,j) {
    return cellSpace+(cellSpace+cellSideLength)*i;
}
function getPosLeft(i,j) {
    return cellSpace+(cellSpace+cellSideLength)*j;
}
//背景颜色
function getNumberBackgroundColor(number) {
    switch(number){
        case  2:return "#eee4da";break;
        case  4:return "#ede0c8" ;break;
        case  8:return "#f2b179" ;break;
        case  16:return "#f59563" ;break;
        case  32:return "#f67c5f" ;break;
        case  64:return "#f65e3b" ;break;
        case  128:return "#edcf72" ;break; 
        case  256:return "#edcc61" ;break;
        case  512:return "#9c0" ;break;
        case  1024:return "#33b5e5" ;break;
        case  2048:return "#09c" ;break;
        case  4096:return "#a6c" ;break;
        case  8192:return "#93c" ;break;
    }
    return "black";
}
//字体颜色
function getNumberColor(number) {
    if (number<=4) {
        return "#776c65";
    }
    return "white";
}
//是否有空格子
function nospace(board) {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0)
                return false;
        }
    }
    return true;
}

//判断能否向左移动
function canMoveLeft(board) {
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++)
            if(board[i][j]!=0)//当前位置是否有数字有数字才能进行如下操作
                //前面格子是否为空或者数字和自己相等
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                    return true;

    return false;
}
//右能否移动
function canMoveRight(board) {
    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--)
            if(board[i][j]!=0)//当前位置是否有数字有数字才能进行如下操作
                //前面格子是否为空或者数字和自己相等
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;

    return false;
}
//上能否移动
function canMoveUp(board) {
    for(var j=0;j<4;j++)
        for(var i=1;i<4;i++)
            if(board[i][j]!=0)//当前位置是否有数字有数字才能进行如下操作
                //前面格子是否为空或者数字和自己相等
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true;

    return false;
}
//下能否移动
function canMoveDown(board) {
    for(var j=0;j<4;j++)
        for(var i=2;i>=0;i--)
            if(board[i][j]!=0)//当前位置是否有数字有数字才能进行如下操作
                //前面格子是否为空或者数字和自己相等
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true;

    return false;
}



 //左右 是否有障碍                      //横列,目标列,纵列
function noBlockHorizontal(row,col1,col2,board) {
    for(var i=col1+1;i<col2;i++)
        if (board[row][i]!=0) 
            return false;
    return true;
}


//上下 是否有障碍
function noBlockVertital(co1,row1,row2,board) {
    for(var i=row1+1;i<row2;i++)
        if (board[i][co1]!=0) 
            return false;
    return true;
}

//是否能移动
function nomove(board) {
    if (canMoveLeft(board)||
        canMoveRight(board)||
        canMoveUp(board)||
        canMoveDown(board)) 
        return false;

    return true;
}

function scoreshow(score) {
    if (score>=200) {
        $('#score').css({'font-size':'30px','color':'blue'});
    }else if(score>=800){
        $('#score').css({'font-size':'40px','color':'green'});
    }if(score>=1300){
        $('#score').css({'font-size':'50px','color':'yellow'});
    }if(score>=1800){
        $('#score').css({'font-size':'60px','color':'red'});
    }
}