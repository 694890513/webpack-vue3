import { getUserInfo } from "@/api/common";
import { Local } from "@/utils/storage";
import { useRequest } from "alova";
import { defineStore } from "pinia";

export const useUserInfoStore = defineStore('userInfo', {
  state: (): UserInfos => ({
    userInfo: {
      sign: "",
      userId: 0,
      userPhoto: "",
      userName: "",
      nickName: "",
      amount: 0,
      amountofCode: 0,
      isWithdraw: "",
      isGoogle: "",
      message: "",
      withdrawCount: 0,
      userLoginDate: '',
      startTime: "",
      endTime: "",
      fee: 0,
      unRead: 0,
      facebookAppID: "",
      googleAppID: "",
      twitterAppID: "",
      keyCode: 0,
      uRate: 0,
      uGold: 0,
      isTaskState: "",
      isvalidator: 0,
      isRePwd: "",
      integral: 0,
      isShop: ""
    },
    token: '',
    refreshToken: ''
  }),
  getters: {
    getToken: (state) => state.token,
    getRefreshToken: (state) => state.refreshToken,
    // getUserInfo: (state) => state.userInfo,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setTokenHeader(tokenHeader: string) {
      Local.set('tokenHeader', tokenHeader);
    },
    removeTOken() {
      this.token = '';
      Local.remove('token');
      Local.remove('refreshToken');
      Local.remove('tokenHeader');
    },
    setRefreshToken(refreshToken: string) {
      Local.set('refreshToken', refreshToken);
    },
    async getApiUserInfo() {
      const {data} = useRequest(() => getUserInfo())
      console.log(data)
      // this.userInfo = data?.valueOf() as UserInfos['userInfo']
    }
  }
});