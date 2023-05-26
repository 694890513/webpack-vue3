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
  }),
  getters: {
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    removeTOken() {
      this.token = '';
    },
    async getApiUserInfo() {
      return new Promise((resolve, reject) => {
      });
    }
  }
});