'use strict';
var _mm=require('util/mm.js');
var _address={
    getAddressList:function (resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/shipping/list.do'),
            data   :{
                pageSize:50
            },
            success:resole,
            error  :reject
        });
    },
    //新建收件人
    save:function (addressInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/shipping/add.do'),
            data   :addressInfo,
            success:resole,
            error  :reject
        });
    },
    //编辑地址
    update:function (addressInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/shipping/update.do'),
            data   :addressInfo,
            success:resole,
            error  :reject
        });
    },
    deleteAddress:function (shippingId,resole,reject) {
        _mm.request({
            url        :_mm.getServerUrl('/shipping/del.do'),
            data       :{
            shippingId : shippingId
            },
            success    :resole,
            error      :reject
        });
    },
    //获取单条地址信息
    getAddress:function (shippingId,resole,reject) {
        _mm.request({
            url        :_mm.getServerUrl('/shipping/select.do'),
            data       :{
            shippingId : shippingId
            },
            success:resole,
            error  :reject
        });
    }
};

module.exports=_address;