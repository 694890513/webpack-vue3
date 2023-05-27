/*
 * @Author: Seven
 * @Date: 2023-05-26 14:10:42
 * @LastEditTime: 2023-05-27 11:06:24
 * @LastEditors: Seven
 * @Description: 工具类方法
 */
import cookie from 'js-cookie';
import pinia from '@/stores/index';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/stores/common';
import router from '@/router/index';
import { i18n } from '@/i18n/index';
import { nextTick } from 'vue';

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

/**
 * 设置浏览器标题国际化
 * @method const title = useTitle(); ==> title()
 */
export function useTitle() {
	const stores = useCommonStore(pinia);
	const { elConfig } = storeToRefs(stores);
	nextTick(() => {
		let webTitle = '';
		let globalTitle: string = elConfig.value.globalTitle;
		const { path, meta } = router.currentRoute.value;
		if (path === '/login') {
			webTitle = <string>meta.title;
		} else {
			let title: string = meta.title as string;
			webTitle = i18n.global.t(title);
		}
		document.title = `${webTitle} - ${globalTitle}` || globalTitle;
	});
}
