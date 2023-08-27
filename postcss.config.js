// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      uniToConvert: 'px',// 需要转换的单位 '默认px'
      viewportWidth: 375, // 设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的小数位数
      proList: ['*'],// 要进行转换的属性列表 ,*表示匹配所有
      viewportUnit: 'vw',// 转换后的视口单位
      selectorBlackList: ['.ignore', '.hairlines'], // 不转换的选择器列表
      fontViewportUnit: 'vw',// 转换后字体使用的视口单位
      // selectorBlackList:[''],过滤不转换的类名
      minPixelValue: 1,// 设置最小的转换数值
      replace: true,//是否直接转化而不添加备用属性
      mediaQuery: true, // 是否允许在媒体查询中转换
      exclude: [/node_modules/] //忽略某些文件夹下的文件 
    },
  },
};