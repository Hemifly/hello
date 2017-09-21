'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user=require('service/user-service.js');
var _mm=require('util/mm.js');

//表单里的错误提示
var formError={
    show:function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide:function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};


var page={
    data:{
        username:'',
        question:'',
        answer  :'',
        token   :''
    },
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        this.loadStepUsername();
    },
    bindEvent:function () {
        var _this=this;
        //点击按钮用户名
        $('#submit-username').click(function () {
            //获取输入框内容
           var username=$.trim($('#username').val());
           if (username) {
            //不为空 调用接口
            _user.getQuestion(username,function (res) {
                _this.data.username=username;
                _this.data.question=res;//缓存数据
                _this.loadStepQuestion();
            },function (errMsg) {
                formError.show(errMsg);
            })
           }
           else{
            formError.show('请输入用户名');
           }
        });
        //点击按钮问题答案
        $('#submit-question').click(function () {
            //获取输入框内容
           var answer=$.trim($('#answer').val());
           if (answer) {
            //不为空 调用接口
            _user.checkAnswer({
                //验证密码提示答案
                username:_this.data.username,
                question:_this.data.question,
                answer  :answer
            },function (res) {
                _this.data.answer=answer;
                _this.data.token=res;//缓存数据
                _this.loadStepPassword();
            },function (errMsg) {
                formError.show(errMsg);
            });
           }
           else{
            formError.show('请输入密码提示问题答案');
           }
        });
    //点击按钮提交新密码
        $('#submit-password').click(function () {
            //获取输入框内容
           var password=$.trim($('#password').val());
           if (password&&password.length>=6) {
            //不为空 调用接口
            _user.resetPassword({
                //验证密码提示答案
                username     :_this.data.username,
                passwordNew  :password,
                forgetToken  :_this.data.token
            },function (res) {
                window.location.href='./result.html?type=pass-reset';
            },function (errMsg) {
                formError.show(errMsg);
            });
           }
           else{
            formError.show('请输入新6密码');
           }
        });
    },
    //第一步输入用户名
    loadStepUsername:function () {
        $('.step-username').show();
    },
    //第二步输入问题提示答案
    loadStepQuestion:function () {
        formError.hide();
        $('.step-username').hide().siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    //第三步输入新密码
    loadStepPassword:function () {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    }
};
$(function () {
    page.init();
});