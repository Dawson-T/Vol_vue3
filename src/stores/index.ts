import userStore from './user'
import communityStore from './community'
import activityStore from './activity'
import adminUserInfoStore from './adminUserinfo'
import umbrellaStore from './umbrella'
import articleStore from './article'
export const useStore = () => {
  return {
    user: userStore(),
    community: communityStore(),
    activity: activityStore(),
    adminUserInfo: adminUserInfoStore(),
    umbrella: umbrellaStore(),
    article:articleStore()
  }
}
