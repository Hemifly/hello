'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav             = require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');
var page = {
    data : {
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        //商品选择 取消
        $(document).on('click','.cart-select',function () {
            var $this = $(this),
            //被点击元素的拥有data-product-id 的父元素的ID
            productId = $this.parents('.cart-table').data('product-id');
            //选中
            if ($this.is(':checked')) {
                _cart.selectProduct(productId,function (res) {
                    _this.renderCart(res);
                },function (errMsg) {
                    _this.showCartError();
                });
            }
            //取消选中
            else{
                _cart.unselectProduct(productId,function (res) {
                    _this.renderCart(res);
                },function (errMsg) {
                    _this.showCartError();
                });
            }
        });
        //商品选择 取消 全选
        $(document).on('click','.cart-select-all',function () {
            var $this = $(this);
            //选中
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                },function (errMsg) {
                    _this.showCartError();
                });
            }
            //取消选中
            else{
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                },function (errMsg) {
                    _this.showCartError();
                });
            }
        });
        //商品数量的变化
        $(document).on('click','.count-btn',function () {
            var $this     = $(this),
                $pCount   = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type      = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount  = 1,
                maxCount  = parseInt($pCount.data('max')),
                newCount  = 0;
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _mm.errorTips('该商品已达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                newCount = currCount - 1;
            };
            _cart.updateProduct({
                productId : productId,
                count : newCount
            },function (res) {
                _this.renderCart(res);
            },function (errMsg) {
                _this.showCartError();
            });
        });
        //删除单个商品
        $(document).on('click','.cart-delete',function () {
            var $this=$(this);
            if (window.confirm('确认要删除商品吗?')) {
                var productId = $this.parents('.cart-table')
                                .data('product-id');
                _this.deleteCartProduct(productId);
            }   
        });
        //删除选中商品
        $(document).on('click','.delete-selected',function () {
            if (window.confirm('确认要删除选中商品吗?')) {
                var arrProductIds = [],
                $selectedItem = $('.cart-select:checked');
                for (var i = 0,iLength = $selectedItem.length; i < iLength; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table')
                                .data('product-id'));
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _mm.errorTips('您还没有选择要删除的商品');
                }
            }   
        });
        //去结算
        $(document).on('click','.btn-submit',function () {
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            }else{
                _mm.errorTips('请选择商品后再提交');
            }
        });
    },
    // 加载购物车信息
    loadCart: function(){
        var _this = this;
        //获取购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        },function (errMsg) {
            _this.showCartError();
        });
    },
    renderCart:function (data) {
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        //生成html
        var cartHtml = _mm.renderHtml(templateIndex,data);
        $('.page-wrap').html(cartHtml);
        //通知导航的购物车更新数据
        nav.loadCartCount();
    },
    //删除指定方法 支持批量 productId用逗号分隔
    deleteCartProduct:function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds,function (res) {
            _this.renderCart(res);
        },function (errMsg) {
            _this.showCartError();
        });
    },
    //数据匹配
    filter:function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError:function () {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，请刷新试试</p>');
    }
}; 
$(function(){
    page.init();
});