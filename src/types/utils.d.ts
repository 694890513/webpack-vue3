/*
 * @Author: Seven
 * @Date: 2023-05-27 17:21:32
 * @LastEditTime: 2023-05-27 17:24:04
 * @LastEditors: Seven
 * @Description: 
 */

interface Signture<T> {
  signature: string
  timestamp: string
  random: string
  language: number | string
  [key: string]: T;
}