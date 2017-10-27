'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm               = require('util/mm.js');
var _order            = require('service/order-service.js');
var _address          = require('service/address-service.js');
var templateProduct   = require('./product-list.string');
var templateAddress   = require('./address-list.string');
var addressModal      = require('./address-modal.js');
var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        //地址选择
        $(document).on('click','.address-item',function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        //提交订单
        $(document).on('click','.order-submit',function () {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId : shippingId
                },function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips('请选择地址后再提交')
            }
        });
        //新建地址
        $(document).on('click','.address-add',function () {
            addressModal.show({
                isUpadate : false,
                onSuccess : function () {
                    _this.loadAddressList();
                }
            })
        });
        //编辑地址
        $(document).on('click','.address-update',function(){
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res){
                addressModal.show({
                    isUpadate : true,
                         data : res,
                    onSuccess : function(){
                        _this.loadAddressList();
                    }
                });
            },function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });
        //删除地址
        $(document).on('click','.address-delete',function(){
            var id = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除吗？')) {
                _address.deleteAddress(id,function (res) {
                    _this.loadAddressList();
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    // 加载地址列表信息
    loadAddressList:function(){
        var _this = this;
        //获取地址列表
        _address.getAddressList(function (res) {
            var addressListHtml = _mm.renderHtml(templateAddress,res);
            $('.address-con').html(addressListHtml);
        },function (errMsg) {
             $('.address-con').html('<p class="err-tip">地址加载失败，请重试</p>');
        });
    },
    loadProductList:  function(){
        var _this = this;
        //获取地址列表
        _order.getProductList(function (res) {
            var productListHtml = _mm.renderHtml(templateProduct,res);
            $('.product-con').html(productListHtml);
        },function (errMsg) {
             $('.product-con').html('<p class="err-tip">商品信息加载失败，请重试</p>');
        });
    }
}; 
$(function(){
    page.init();
});