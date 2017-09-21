'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');
var page={
    data:{
      orderNumber : _mm.getUrlParam('orderNumber')
    },
    init:function () {
        this.onLoad();  
    },
    onLoad:function () {
        //加载payment
        this.loadPaymentInfo();
    },
    //加载订单列表
    loadPaymentInfo:function () {
      var _this = this,
      paymentHtml = '',
      $pageWrap = $('.page-wrap');
      $pageWrap.html('<div class="loading"></div>')
      console.log(this.data.orderNumber);
      _payment.getPaymentInfo(this.data.orderNumber,function (res) {
        //渲染html
        paymentHtml = _mm.renderHtml(templateIndex,res);
        $pageWrap.html(paymentHtml);
        _this.listOrderStatus();
      },function (errMsg) {
        $pageWrap.html('<p class="err-tip">'+ errMsg +'</p>');
      });
    },
    //监听订单状态
    listOrderStatus:function () {
      var _this = this;
      this.paymentTimer = window.setInterval(function () {
        _payment.getPaymentStatus(_this.data.orderNumber,function (res) {
          res = true;
          if (res == true) {
            window.location.href
               = './result.html?type=payment&orderNumber='+_this.data.orderNumber;
          }
        });
      },5000);
    }
};
$(function () {
    page.init();
});