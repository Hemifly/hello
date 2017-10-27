'use strict';
var _mm=require('util/mm.js');
var _user={
    //用户登录
    login:function (userInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/user/login.do'),
            method :'POST',
            data   :userInfo,
            success:resole,
            error  :reject
        });
    },
    //用户名验证
    checkUsername:function (username,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/user/check_valid.do'),
            method :'POST',
            data   :{
                type:'username',
                str :username
            },
            success:resole,
            error  :reject
        });
    },
    //密码提示问题答案验证
    checkAnswer:function (userInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/user/forget_check_answer.do'),
            method :'POST',
            data   :userInfo,
            success:resole,
            error  :reject
        });
    },
    //重置密码
    resetPassword:function (userInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/user/forget_reset_password.do'),
            method :'POST',
            data   :userInfo,
            success:resole,
            error  :reject
        });
    },
    //注册
    register:function (userInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/user/register.do'),
            method :'POST',
            data   :userInfo,
            success:resole,
            error  :reject
        });
    },
    //更新个人信息
    updateUserInfo:function (userInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/user/update_information.do'),
            method :'POST',
            data   :userInfo,
            success:resole,
            error  :reject
        });
    },
    //登录状态下修改密码
    updatePassword:function (userInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/user/reset_password.do'),
            method :'POST',
            data   :userInfo,
            success:resole,
            error  :reject
        });
    },
    //检查登录状态
    checkLogin:function (resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/user/get_user_info.do'),
            method :'POST',
            success:resole,
            error  :reject
        });
    },
    getQuestion:function (username,resole,reject) {
        //获取密码提示问题
        _mm.request({
            url    :_mm.getServerUrl('/user/forget_get_question.do'),
            data   :{
                username:username
            },
            method :'POST',
            success:resole,
            error  :reject
        });
    },
    geuUserInfo:function (resole,reject) {
        //获取用户信息
        _mm.request({
            url    :_mm.getServerUrl('/user/get_information.do'),
            method :'POST',
            success:resole,
            error  :reject
        });
    },
    logout:function (resole,reject) {
        //登出
        _mm.request({
            url    :_mm.getServerUrl('/user/logout.do'),
            method :'POST',
            success:resole,
            error  :reject
        });
    }
};
module.exports=_user;