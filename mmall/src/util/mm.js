'use strict';
var Hogan =require('hogan');
var conf={
    serverHost:''
};
var _mm={             
    //网络请求       //参数
    request:function (param) {
        var _this=this;//缓存对象
        $.ajax({
            type       :param.method  ||'get',
            url        :param.url     ||'',
            dataType   :param.type    ||'json',//数据类型
            data       :param.data    ||'',//发送到服务器的数据
            success    :function (res) {
                    //请求成功
                    if (res.status===0) {
                        //判断是否是函数类型   如果是 回调函数 将获取到的数据和信息 传到服务器
                        typeof param.success==='function' &&param.success(res.data,res.msg)
                        //没有登陆状态，需要强制登陆
                    }else if (res.status===10) {
                        _this.doLogin();
                        //请求数据错误
                    }else if (res.status===1) {
                        typeof param.error==='function' &&param.error(res.msg);
                    }
            },
            error      :function (err) {
                    typeof param.error==='function' &&param.error(error.statusText);
            }

        });
    },
    //获取服务器地址 方便以后更改服务器地址
    getServerUrl:function (path) {
        return conf.serverHost+path;
    },
    //获取url参数
    getUrlParam:function (name) {
        var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result=window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml:function (htmlTemplate,data) {
        var template=Hogan.compile(htmlTemplate),
            result=template.render(data);
        return result;
    },
    //成功提示
    successTips:function (msg) {
        alert(msg||'操作成功');
    },
    //错误提示
    errorTips:function (msg) {
        alert(msg||'哪里不对');
    },
    //字段的验证，支持非空，手机，邮箱的判断
    validate:function (value,type) {
        var value=$.trim(value);
        //非空验证
        if ('require'===type) {
            return !!value;
        }
        //手机
        if ('phone'===type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱
        if ('email'===type) {
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    //统一登录处理
    doLogin:function () {
        //跳转到登录页面 或者当前页面则 对当前页面的地址进行编码 安全性
        window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
    },
    //跳转首页
    goHome:function () {
        window.location.href='./index.html';
    }
};

module.exports=_mm;