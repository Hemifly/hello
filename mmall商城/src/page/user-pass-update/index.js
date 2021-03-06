'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide=require('page/common/nav-side/index.js');
var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
var page={
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        navSide.init({
            name:'user-pass-update'
        });
    },
    bindEvent:function () {
        var _this =this;
        //事件代理 页面通过js渲染不能直接绑定
        $(document).on('click','.btn-submit',function () {
            var userInfo={
                password         : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
            validateResult=_this.validateForm(userInfo);
            if (validateResult.status) {
                //更改用户密码
                 _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                 },function (res,msg) {
                    _mm.successTips(msg);
                    window.location.href='./index.html';
                 },function (errMsg) {
                    _mm.errorTips(errMsg);
                 });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
   //验证字段信息
   validateForm:function (formData) {
    var result={
            status:false,
            msg:''
        };
        if(!_mm.validate(formData.password,'require')){
            result.msg='原密码不能为空';
            return result;
        }
        if (!formData.passwordNew||formData.passwordNew.length<6) {
            result.msg='密码不得小于6位';
            return result;
        }
        if (formData.passwordNew!==formData.passwordConfirm) {
            result.msg='两次输入的密码不一致';
            return result;
        }
        //通过验证，返回正确结果
        result.status=true;
        result.msg='验证通过';
        return result;
       
   }
};
$(function () {
    page.init();
});