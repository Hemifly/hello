'use strict';
var _mm=require('util/mm.js');
var _order={
    //获取商品列表
    getProductList:function (resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/order/get_order_cart_product.do'),
            success:resole,
            error  :reject
        });
    },
    createOrder:function (orderInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/order/create.do'),
            data   :orderInfo,
            success:resole,
            error  :reject
        });
    },
    //获取订单列表
    getOrderList:function (listParam,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/order/list.do'),
            data   :listParam,
            success:resole,
            error  :reject
        });
    },
    //获取订单详情
    getOrderDetail:function (orderNumber,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/order/detail.do'),
            data   :{
                orderNo:orderNumber
            },
            success:resole,
            error  :reject
        });
    },
    //取消订单
    cancelOrder:function (orderNumber,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/order/cancel.do'),
            data   :{
                orderNo:orderNumber
            },
            success:resole,
            error  :reject
        });
    }
};
module.exports=_order;