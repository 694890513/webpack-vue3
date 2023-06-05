/*
 * @Author: Seven
 * @Date: 2023-06-02 16:22:01
 * @LastEditTime: 2023-06-05 10:34:27
 * @LastEditors: Seven
 * @Description: 
 */
export interface RefreshTokenRes {
  tokenHeader: string;
  token: string;
  expiresIn: number;
  refreshToken: string;
  passwordErrorNum: number;
  passwordErrorMaxNum: number | null;
}
export interface PaginationInfo<T> {
  pageNo: number;
  pageSize: number;
  [key: string]: T;
}
export interface PaginationRes<T> {
  list: T[];
  pageNo: number;
  totalCount: number;
  totalPage: number;
}