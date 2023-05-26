/*
 * @Author: Seven
 * @Date: 2023-05-26 15:21:29
 * @LastEditTime: 2023-05-26 15:38:04
 * @LastEditors: Seven
 * @Description: 公共store
 */
import { defineStore } from "pinia";

export const useCommonStore = defineStore('common', {
  state: (): Common => ({
    elConfig: {
      size: 'small',
      zIndex: 3000,
    }
  }),
  getters: {
    getElConfig: (state) => state.elConfig,
  }
});