import { Language } from "./enum"
import { Local } from "./storage"
import { deepCopy, encryptWithMD5, handleEmptyObj, randomGuid } from "./utils"

/**
 * @description: 生成签名
 * @param {*} T 请求参数类型
 * @return {*} 带签名的请求参数
 */
const createSignature = <T>(data: any): Signture<T> => {
  // 拷贝configData
  let configData = deepCopy(data)
  configData = handleEmptyObj(configData)
  configData.language = Language[Local.get('locale')]
  configData.random = randomGuid()
  // 提取属性名到数组
  const keysArray = Object.keys(configData)
  
  // 按字母升序排序
  keysArray.sort()
  // 创建新对象
  const sortedObject = {} as any
  const white = ['signature', 'track']
  // console.log(configData)
  keysArray.forEach((key) => {
    if (configData[key] !== null && configData[key] !== '' && !white.includes(key))
      sortedObject[key] = configData[key] === 0.0 ? 0.0 : configData[key]
  })
  configData.signature = encryptWithMD5(JSON.stringify(sortedObject))
  configData.timestamp = Math.floor(Date.now() / 1000)
  
  return configData as Signture<T>
}

export default createSignature