import axios from 'axios'
import requests from './request'
import remock from './requestmock'
export const requestlist = () => {
    return requests.get('/product/getBaseCategoryList')
}
export const requestmock = () => {
    return remock.get('/banner')
}
export const reqfloorlist = () => {
    return remock.get('/floor')
}
export const reqlist = (params) => {
    return requests({ url: "/list", method: 'post', data: params })
}
export const reqdetail = (skuId) => {
    return requests({ url: `/item/${skuId}`, method: 'get' })
}
export const reqshop = (skuId, skuNum) => {
    return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
export const reqshopcar = () => { return requests({ url: '/cart/cartList', method: 'get' }) }
export const reqdeletshop = (skuId) => { return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' }) }
export const requpdate = (skuId, isChecked) => { return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' }) }
export const reqcode = (phone) => { return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' }) }
export const reqzhuce = (data) => { return requests({ url: '/user/passport/register', data, method: 'post' }) }
export const reqlogin = (data) => { return requests({ url: '/user/passport/login', data, method: 'post' }) }
export const requserinfo = () => { return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' }) }
export const reqloginout = () => { return requests({ url: '/user/passport/logout', method: 'get' }) }
export const reqpeople = () => { return requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' }) }
export const reqshopinfo = () => { return requests({ url: '/order/auth/trade', method: 'get' }) }
export const reqsubmit = (tradeNo, data) => { return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' }) }
export const reqPayInfo = (orderId) => { return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' }) }
export const reqstatus = (orderId) => { return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' }) }
export const reqmyorderlist = (page, limit) => { return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' }) }