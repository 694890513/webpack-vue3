/*
 * @Author: Seven
 * @Date: 2023-06-05 10:03:07
 * @LastEditTime: 2023-06-05 10:35:03
 * @LastEditors: Seven
 * @Description: 
 */
import alovaInstance from '@/utils/request'
import { Home } from './home'
import { PaginationInfo, PaginationRes } from '@/types/api/common'

/**
 * @description: 获取消息列表
 * @return {*}
 */
export const getMessageList = (data: PaginationInfo<any>) => alovaInstance.Post<PaginationRes<Home.MessageRes>>('api/webapi/GetMessageList', {...data})
