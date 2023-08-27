/**
 * 数组合并 -- 根据数据 id 异同合并
 * @param arr1 新值
 * @param arr2 旧值
 * @returns 合并后的数组
 */
export const mergeObjectsByDifferentId = (arr1: any, arr2: any) => {
  let array = [...arr2, ...arr1]

  const result = array.filter((item, index) => {
    const i = array.findIndex((obj) => obj.id === item.id)
    return i === index
  })
  return result
}

// 图片处理模块
const fileToDataURL = (file: Blob): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = (e) => resolve((e.target as FileReader).result)
    reader.readAsDataURL(file)
  })
}

const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = dataURL
  })
}
const canvastoFile = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> => {
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob), type, quality)
  )
}
/**
 * 图片压缩方法
 * @param {Object}  file 图片文件
 * @param {Nubmber} quality 压缩质量参数
 * @returns 压缩后的新图片
 */
export const compressionFile = async (file, quality = 0.2) => {
  const fileName = file.file.name

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const base64 = file.content
  const type = getImageTypeFromBase64(base64)
  const img = await dataURLToImage(base64)
  canvas.width = img.width
  canvas.height = img.height
  context.clearRect(0, 0, img.width, img.height)
  context.drawImage(img, 0, 0, img.width, img.height)
  const blob = (await canvastoFile(canvas, type, quality)) as Blob // quality:0.5可根据实际情况计算
  const newFile = await new File([blob], fileName, {
    type: type,
  })
  const newBase64 = await fileToDataURL(newFile)
  return newBase64
}

const getImageTypeFromBase64 = (base64Data) => {
  // 检查base64数据是否以"data:"开头
  if (base64Data.startsWith('data:')) {
    // 获取"data:"之后的部分，直到分号";"之前的内容
    const startIndex = 'data:'.length
    const endIndex = base64Data.indexOf(';')
    if (endIndex !== -1) {
      // 提取图像类型
      const imageType = base64Data.slice(startIndex, endIndex)
      return imageType
    }
  }
  // 如果无效的Base64数据或者没有找到图像类型，则返回null
  return null
}

// 转markdown语法--gpt页面
import MarkdownIt from 'markdown-it'
export const transformMarkdown = (text: string) => {
  const md = new MarkdownIt()
  return md.render(text)
}


// 获取本地缓存 key为缓存的名称
export const getLocalData = (key: string) => {
  if (key) {
    return JSON.parse(localStorage.getItem(key) as string)
  } else {
    // 未传入key 不执行
    return false
  }
}

// 设置本地缓存
export const setLocalData = (key: string, value: any) => {
  if (key && value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    // 本地空不执行
    return false
  }
}

// 移除本地缓存
export const removeLocalData = (key: string) => {
  if (key) {
    localStorage.removeItem(key)
  } else {
    // 本地空不执行
    return false
  }
}


import dayjs from 'dayjs'
const now = dayjs()
// 当前对话时间
export const currentChatTime = () => {
  return now.format('MM-DD HH:mm:ss')
}
// 请求帖子数据时间格式
export const requestTime = (time: string | null) => {
  if (time) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return dayjs(now).format('YYYY-MM-DD HH:mm:ss')
  }
}
//用于完善时间显示
export const formatChatTime = (timestamp: string) => {
  const parsedTime = dayjs(timestamp)
  const now = dayjs()

  // 如果时间是今天，则只显示时分秒
  if (parsedTime.isSame(now, 'day')) {
    return parsedTime.format(`HH:mm`)
  }
  // 如果时间是昨天，则显示昨天
  const yesterday = now.subtract(1, 'day')
  if (parsedTime.isSame(yesterday, 'day')) {
    return parsedTime.format('昨天HH:mm')
  }
  // 如果时间是今年，则显示月份和日期
  if (parsedTime.isSame(now, 'year')) {
    return parsedTime.format('MM月DD日HH:mm')
  }
  // 其他情况显示完整日期和时间
  return parsedTime.format('YYYY-MM-DD HH:mm')
}

// 身份验证
export const isLogin = (): boolean => {
  const userinfo = localStorage.getItem('userinfo')
  const tokenExpiresAt = localStorage.getItem('token_expires_at')

  if (userinfo && tokenExpiresAt) {
    const expiresAt = JSON.parse(tokenExpiresAt)
    if (Date.now() < expiresAt) {
      return true // 未过期
    }
  }
  return false
}