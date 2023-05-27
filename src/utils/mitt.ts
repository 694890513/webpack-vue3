/*
 * @Author: Seven
 * @Date: 2023-05-27 10:03:13
 * @LastEditTime: 2023-05-27 10:04:42
 * @LastEditors: Seven
 * @Description: 
 */
// https://www.npmjs.com/package/mitt
import mitt, { Emitter } from 'mitt';

// 类型
const emitter: Emitter<any> = mitt<any>();

// 导出
export default emitter;
