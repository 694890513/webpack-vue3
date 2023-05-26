/*
 * @Author: Seven
 * @Date: 2023-05-26 13:57:32
 * @LastEditTime: 2023-05-26 15:22:40
 * @LastEditors: Seven
 * @Description: pinia state类型定义
 */
// 用户信息
declare interface UserInfos<T = any> {
  token: string
  userInfo: {
    sign: string;
    userId: number;
    userPhoto: string;
    userName: string;
    nickName: string;
    amount: number;
    amountofCode: number;
    isWithdraw: string;
    isGoogle: string;
    message: string;
    withdrawCount: number;
    userLoginDate: string;
    startTime: string;
    endTime: string;
    fee: number;
    unRead: number;
    facebookAppID: string;
    googleAppID: string;
    twitterAppID: string;
    keyCode: number;
    uRate: number;
    uGold: number;
    isTaskState: string;
    isvalidator: number;
    isRePwd: string;
    integral: number;
    isShop: string;
  }
  [key: string]: T;
}

declare interface Common<T = any> {
  [key: string]: T;
}