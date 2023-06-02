/*
 * @Author: Seven
 * @Date: 2023-05-27 14:11:39
 * @LastEditTime: 2023-06-02 17:39:15
 * @LastEditors: Seven
 * @Description: 全局请求方法
 */

import { RefreshTokenRes } from '@/types/api/common'
import alovaInstance from '@/utils/request'
// import createSignature from '@/utils/signature'

export const getConfig = () => {
  let data = {
    merchant: process.env.VITE_BASE_MERCHANT,
  }
  return alovaInstance.Post('api/webapi/GetOnSites', { ...data }, {
    name: 'getConfig'
  })
}

export const getHome = () => alovaInstance.Post('api/webapi/GetAllGameList')

export const getUserInfo = () => alovaInstance.Post<UserInfos['userInfo']>('api/webapi/GetUserInfo')

export const getRefreshToken = () => {
  return alovaInstance.Post<RefreshTokenRes>('api/webapi/RefreshToken', {},
  {
    name: 'refreshToken'
  }
)
}
