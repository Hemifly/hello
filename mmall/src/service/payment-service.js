'use strict';
var _mm=require('util/mm.js');
var _payment={
    //获取支付信息
    getPaymentInfo:function (orderNumber,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/order/pay.do'),
            data   :{
                orderNo : orderNumber
            },
            success:resole,
            error  :reject
        });
    },
    //获取支付信息
    getPaymentStatus:function (orderNumber,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/order/query_order_pay_status.do'),
            data   :{
                orderNo : orderNumber
            },
            success:resole,
            error  :reject
        });
    }
};
module.exports=_payment;