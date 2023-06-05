/*
 * @Author: Seven
 * @Date: 2023-06-05 10:05:35
 * @LastEditTime: 2023-06-05 10:07:26
 * @LastEditors: Seven
 * @Description: 
 */
export namespace Home {
  export interface MessageRes {
    messageID: number;
    addTime:   Date;
    state:     number;
    stateName: string;
    title:     string;
    messages:  string;
  }
}
