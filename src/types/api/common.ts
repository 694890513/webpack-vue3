/*
 * @Author: Seven
 * @Date: 2023-06-02 16:22:01
 * @LastEditTime: 2023-06-02 16:53:45
 * @LastEditors: Seven
 * @Description: 
 */
export interface RefreshTokenRes {
  tokenHeader:         string;
  token:               string;
  expiresIn:           number;
  refreshToken:        string;
  passwordErrorNum:    number;
  passwordErrorMaxNum: number | null;
}