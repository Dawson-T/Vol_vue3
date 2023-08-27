// 自动注入路由
// webpack内置require.context() vite不支持
// const modules = require.context('../views', true, /.vue/)
// /**
//  * return 路径和组件
//  */
// export const autoRoutes = modules.keys().map((item) => {
//   const viewName = item.slice(2)
//   const path = item.slice(1).replace('.vue', '').replace('index', '')
//   const viewModule = () => import(`../views/${viewName}`)
//   return {
//     path,
//     component: viewModule,
//   }
// })
export const generateRoutes = async () => {
  const routes: any[] = []

  // 第一层
  const modulesFiles1: any = import.meta.glob('../views/*/*.vue')
  const modulesName1 = Object.keys(modulesFiles1).filter((item: any) => true)
  await Promise.all(
    modulesName1.map(async (item: string) => {
      const name = item.split('/')[2]
      const component = item.replace('..', '@')
      const path = '/' + name.toLowerCase()
      const obj = {
        name,
        path,
        component,
      }
      routes.push(obj)
    })
  )
  // 第二层
  const modulesFiles2: any = import.meta.glob('../views/*/*/*.vue')
  const modulesName2 = Object.keys(modulesFiles2).filter((item: any) => true)
  await Promise.all(
    modulesName2.map(async (item: string) => {
      const nameList = item.split('/')
      const name = nameList[3]
      const component = item.replace('..', '@')
      const path = '/' + name.toLowerCase()
      const obj = {
        name,
        path,
        component,
      }
      routes.push(obj)
    })
  )
  // 第三层
  const modulesFiles3: any = import.meta.glob('../views/*/*/*/*.vue')
  const modulesName3 = Object.keys(modulesFiles3).filter((item: any) => true)
  await Promise.all(
    modulesName3.map(async (item: string) => {
      const nameList = item.split('/')
      const name = nameList[4]
      const component = item.replace('..', '@')
      const path = '/' + name.toLowerCase()
      const obj = {
        name,
        path,
        component,
      }
      routes.push(obj)
    })
  )
  return routes
}
