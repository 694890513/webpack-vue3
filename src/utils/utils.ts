/*
 * @Author: Seven
 * @Date: 2023-05-26 14:10:42
 * @LastEditTime: 2023-05-26 14:12:57
 * @LastEditors: Seven
 * @Description: 工具类方法
 */
import cookie from 'js-cookie';

/**
 * @description: 设置cookie
 * @param {string} key
 * @param {string} value
 * @param {number} expires
 * @return {*}
 */
export const setCookie = (key: string, value: string, expires?: number | Date): any => {
  cookie.set(key, value, { expires });
}

/**
 * @description: 获取cookie
 * @return {*}
 */
export const getCookie = (key: string): any => {
  return cookie.get(key);
}

/**
 * @description: 清除cookie
 * @return {*}
 */
export const removeCookie = (key: string): any => {
  cookie.remove(key);
}
