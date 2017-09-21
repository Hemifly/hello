'use strict';
var _mm=require('util/mm.js');
var _cart={
    //获取购物车数量
    getCartCount:function (resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/get_cart_product_count.do'),
            success:resole,
            error  :reject
        });
    },
    //添加到购物车
    addToCart:function (productInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/add.do'),
            data   :productInfo,
            success:resole,
            error  :reject
        });
    },
    //获取购物车列表
    getCartList:function (resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/list.do'),
            success:resole,
            error  :reject
        });
    },
    //选择购物车商品
    selectProduct:function (productId,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/select.do'),
            data   :{
                productId:productId
            },
            success:resole,
            error  :reject
        });
    },
    //取消选择购物车商品
    unselectProduct:function (productId,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/un_select.do'),
            data   :{
                productId:productId
            },
            success:resole,
            error  :reject
        });
    },
    //选择购物车全部商品
    selectAllProduct:function (resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/select_all.do'),
            success:resole,
            error  :reject
        });
    },
    //取消选择购物车全部商品
    unselectAllProduct:function (resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/un_select_all.do'),
            success:resole,
            error  :reject
        });
    },
    //更新商品数量
    updateProduct:function (productInfo,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/update.do'),
            data   :productInfo,
            success:resole,
            error  :reject
        });
    },
    //删除指定商品
    deleteProduct:function (productIds,resole,reject) {
        _mm.request({
            url    :_mm.getServerUrl('/cart/delete_product.do'),
            data   :{
                productIds : productIds
            },
            success:resole,
            error  :reject
        });
    }
};
module.exports=_cart;