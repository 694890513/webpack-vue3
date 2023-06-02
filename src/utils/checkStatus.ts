/*
 * @Author: Seven
 * @Date: 2023-06-01 17:11:54
 * @LastEditTime: 2023-06-01 17:16:43
 * @LastEditors: Seven
 * @Description: 
 */
/*
 * @Description:
 */
import {i18n} from '@/i18n/index'
import { ElMessage } from 'element-plus'
const { t } = i18n.global

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number) => {
	let msg = ''
	switch (status) {
		case 400:
			msg = t('message.common.statusTip1')
			break
		// case 401: token 已过期
		// 	msg = t('statusTip2')
		// 	break
		// case 403:  挤线问题
		// 	msg = t('statusTip3')
		// 	break
		case 404:
			msg = t('message.common.statusTip4')
			break
		case 405:
			msg = t('message.common.statusTip5')
			break
		case 408:
			msg = t('message.common.statusTip6')
			break
		case 500:
			msg = t('message.common.statusTip7')
			break
		case 502:
			msg = t('message.common.statusTip8')
			break
		case 503:
			msg = t('message.common.statusTip9')
			break
		case 504:
			msg = t('message.common.statusTip10')
			break
		default:
			msg = t('message.common.statusTip11')
	}
	ElMessage.error(msg)
}
