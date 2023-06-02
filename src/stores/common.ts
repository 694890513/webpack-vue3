/*
 * @Author: Seven
 * @Date: 2023-05-26 15:21:29
 * @LastEditTime: 2023-05-29 16:37:09
 * @LastEditors: Seven
 * @Description: 公共store
 */
import { defineStore } from "pinia";

export const useCommonStore = defineStore('common', {
  state: (): Common => ({
    elConfig: {
      size: 'small',
      zIndex: 3000,
      animation: 'slide-right',
      globalTitle: 'lottery_pc',
    },
    globalIi18n: 'zh',
  }),
  getters: {
    getElConfig: (state) => state.elConfig,
    getGlobalIi18n: (state):string => state.globalIi18n,
  },
  actions: {
    setGlobalIi18n(ii18n: string) {
      this.globalIi18n = ii18n
    }
  }
});