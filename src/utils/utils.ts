/*
 * @Author: Seven
 * @Date: 2023-05-26 14:10:42
 * @LastEditTime: 2023-06-01 11:30:04
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
import {Md5} from 'ts-md5'


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

/***
 * @description 是否是生产环境
 */
export const IS_PROD = process.env.NODE_ENV === 'production'
export const IS_DEV = process.env.NODE_ENV === 'development'


/**
 * @description: 深拷贝方法
 * @param {T} obj
 * @return {*}
 */
export function deepCopy(obj: EmptyObjectType): any {
	let newObj: EmptyObjectType;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (obj[attr] && typeof obj[attr] === 'object') {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}


// Md5加密
export const encryptWithMD5 = (data: string) => {
	// 使用 MD5 函数进行加密，输出结果为 WordArray 对象
	const encryptedData = Md5.hashStr(data)
	// 将 WordArray 对象转换为十六进制字符串
	const encryptedDataHex = encryptedData.toString()
	// 取前 32 位作为加密结果
	const encryptedData32 = encryptedDataHex.toUpperCase().slice(0, 32)
	return encryptedData32
}

/**
 * @description 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @param list 数组对象
 * @returns 删除空值后的数组对象
 */
export function handleEmpty(list: EmptyArrayType) {
	const arr = [];
	for (const i in list) {
		const d = [];
		for (const j in list[i]) {
			d.push(list[i][j]);
		}
		const leng = d.filter((item) => item === '').length;
		if (leng !== d.length) {
			arr.push(list[i]);
		}
	}
	return arr;
}

/**
 * @description: 判断对象中所有属性是否为空，为空则删除当前行对象
 * @return {*}
 */
export function handleEmptyObj(obj: EmptyObjectType) {
	const newObj = {} as EmptyObjectType;
	for (const i in obj) {
		if (obj[i] !== '') {
			newObj[i] = obj[i];
		}
	}
	return newObj;
}


export function randomGuid() {
	return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0
		var v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}