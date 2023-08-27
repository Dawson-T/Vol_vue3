import userStore from './user'
import communityStore from './community'
import activityStore from './activity'
import adminUserInfoStore from './adminUserinfo'
export const useStore = () => {
  return {
    user: userStore(),
    community: communityStore(),
    activity: activityStore(),
    adminUserInfo: adminUserInfoStore(),
  }
}
