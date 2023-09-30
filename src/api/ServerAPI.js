import http from '@/utils/request'
/**
 * gpt回答
 * @param {*} key key
 * @param {*} q 问题
 * @returns
 */
export const getChatGPTAnswer = (key, q) => {
  return http({
    method: 'POST',
    url: 'gpt/chat',
    data: {
      key,
      q,
    },
    needToken: true,
  })
}

/**
 * 获取活动信息
 * @param {*} created_at  创建时间
 * @param {*} limit  条数
 * @returns
 */
export const getActivities = (time, limit) => {
  return http({
    method: 'GET',
    url: `act/getacts?created_at=${time}&limit=${limit}`,
    needToken: false,
  })
}

// 是否报名
export const isSignUp = (id) => {
  return http({
    method: 'POST',
    url: 'act/isreg',
    data: { act_id: id },
    needToken: true,
  })
}
// 报名和取消报名
export const SignUp = (id) => {
  return http({
    method: 'POST',
    url: 'act/register',
    data: { act_id: id },
    needToken: true,
  })
}
// 个人报名全部记录
export const getSignUpData = () => {
  return http({
    method: 'POST',
    url: 'act/myregs',
    needToken: true,
  })
}

/**
 * 发布活动
 * @param {*} option 活动参数
 * @returns
 */
export const AddActive = (option) => {
  return http({
    method: 'POST',
    url: 'act/add',
    data: option,
    needToken: true,
  })
}

// 删除活动
export const DelActive = (id) => {
  return http({
    method: 'POST',
    url: 'act/del',
    data: { id },
    needToken: true,
  })
}

// 反馈
export const feedBackPost = (option) => {
  return http({
    data: option,
    url: '/opt/sendopt',
    method: 'POST',
    needToken: false,
  })
}

// -------------------------------------------社区----------------------------------------------
// 请求社区数据
export const getCommunityData = (time, limit) => {
  return http({
    url: `/post/getposts?created_at=${time}&limit=${limit}`,
    method: 'GET',
    needToken: false,
  })
}

//
export const getAuthCommunityData = (time, limit) => {
  console.log(time, limit);
  return http({
    url: `post/getposts?created_at=${time}&limit=${limit}`,
    method: 'GET',
    needToken: true,
  })
}
// 获取个人帖子
export const getPersonData = (time, limit) => {
  return http({
    method: 'GET',
    url: `post/myposts?created_at=${time}&limit=${limit}`,
    needToken: true,
  })
}
// 上传点赞情况
export const postLiked = (id) => {
  return http({
    method: 'POST',
    url: 'post/like',
    data: { post_id: id },
    needToken: true,
  })
}
//  是否点赞
export const postIsLike = (id) => {
  return http({
    method: 'POST',
    url: 'post/islike',
    data: { post_id: id },
    needToken: true,
  })
}
// 发表评论
export const PostCommentsData = (option) => {
  return http({
    method: 'POST',
    url: 'post/cmt',
    data: option,
    needToken: true,
  })
}

// 获取评论数据
export const GetCommentsData = (id) => {
  return http({
    method: 'POST',
    url: 'post/getcmts',
    data: { post_id: id },
    needToken: true,
  })
}

// 删除帖子
export const deleteCard = (id) => {
  return http({
    method: 'POST',
    url: 'post/delete',
    data: { post_id: id },
    needToken: true,
  })
}

// ----------------------------------------爱心雨伞---------------------------------------------

// 借还伞请求
export const postUmbrella = (option) => {
  return http({
    url: 'uma/bworrt',
    method: 'POST',
    data: option,
    needToken: true,
  })
}

// 扫码接口 --url必须使用扫码界面的地址
export const getJsJDK = (url) => {
  return http({
    url: 'user/getjscfg',
    method: 'POST',
    data: { url },
    needToken: true,
  })
}

// ---------------------上传------------------

// 上传图片
export const uploadImgData = (base64) => {
  // 返回promise对象
  return http({
    url: 'upload/post/image',
    method: 'POST',
    data: {
      image: base64,
    },
    needToken: true,
  })
}

// 上传表单
export const uploadFormDataFn = (context, images) => {
  const data = {
    context,
    ...(images && { images })  // 存在图片就传入服务器
  };
  return http({
    method: 'POST',
    url: 'post/publish',
    data: data,
    needToken: true,
  })
}

// 更新帖子
export const updateFormData = (data) => {
  return http({
    method: 'POST',
    url: 'post/update',
    data: data,
    needToken: true,
  })
}

// 文章获取草稿
export const getArticleDraft = (id) => {
  return http({
    method: 'POST',
    url: 'arl/draft/get',
    data: { id },
    needToken: true
  })
}
// 添加/更新文章草稿
export const updateArticleDraft = (data) => {
  return http({
    method: 'POST',
    url: 'arl/draft/add',
    data: data,
    needToken: true
  })
}

// 删除文字草稿
export const delArticleDraft = () => {
  return http({
    method: 'POST',
    url: 'arl/draft/del',
    // data: data,
    needToken: true
  })
}

// 发布文章
export const publishArticle = (data) => {
  return http({
    method: 'POST',
    url: '/arl/add',
    data: data,
    needToken: true
  })
}
class ServerAPIs {
  // 获取文章详情
  static getArticleDetail = (id) => {
    return http({
      method: 'POST',
      url: '/arl/get',
      data: { id },
      needToken: true
    })
  }
  // 获取文章列表
  static getArticleList = (data) => {
    return http({
      method: 'POST',
      url: '/arl/getarls',
      data: data,
      needToken: false
    })
  }
}
export default ServerAPIs
