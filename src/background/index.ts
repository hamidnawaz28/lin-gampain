import Browser from 'webextension-polyfill'
import { LINKEDIN_CAMPAIGN } from '../common/messaging'
import {
  createNewCampaign,
  deleteCampaignData,
  getStorage,
  readCampaignData,
  updateCampaignData,
} from '../common/utils'

Browser.runtime.onMessage.addListener(async (request, tabInfo) => {
  const { action, data } = request
  const { tab } = tabInfo
  const tabId = tab?.id || 0

  const responseObj = {
    [LINKEDIN_CAMPAIGN.CREATE_CAMPAIGN]: async () => {
      const { title } = data
      const campaignId = await createNewCampaign(title)
      return campaignId
    },
    [LINKEDIN_CAMPAIGN.ADD_PROFILE]: async () => {
      return true
    },
    [LINKEDIN_CAMPAIGN.ADD_PROFILES]: async () => {
      const { campaignId, profilesData } = data
      const campaignData = await readCampaignData(campaignId)
      const newCampaignData = {
        ...campaignData,
        profiles: [...campaignData.profiles, ...profilesData],
      }
      await updateCampaignData(campaignId, newCampaignData)
      return await getStorage()
    },
    [LINKEDIN_CAMPAIGN.GET_ALL_CAMPAIGNS]: async () => {
      return await getStorage()
    },
    [LINKEDIN_CAMPAIGN.GET_A_CAMPAIGN_DETAILS]: async () => {
      const { campaignId } = data
      const allCampaigns = await getStorage()
      const campaignData = allCampaigns.find((campaign: any) => campaign.campaignId != campaignId)
      return campaignData ? campaignData : []
    },
    [LINKEDIN_CAMPAIGN.EDIT_CAMPAIGN]: async () => {
      const { campaignId, title } = data
      const allCampaigns = await updateCampaignData(campaignId, { title })
      return allCampaigns
    },
    [LINKEDIN_CAMPAIGN.DELETE_PROFILE]: async () => {
      return true
    },
    [LINKEDIN_CAMPAIGN.DELETE_PROFILES]: async () => {
      return true
    },
    [LINKEDIN_CAMPAIGN.DELETE_CAMPAIGN]: async () => {
      const { campaignId } = data
      const allCampaigns = await deleteCampaignData(campaignId)
      return allCampaigns
    },
    [LINKEDIN_CAMPAIGN.DELETE_CAMPAIGNS]: async () => {
      return true
    },
    [LINKEDIN_CAMPAIGN.EDIT_NEW_CAMPAIGN_TEMPLATE]: async () => {
      const { campaignId, newCampaignTemplate } = data
      const allCampaigns = await updateCampaignData(campaignId, { newCampaignTemplate })
      return allCampaigns
    },
    [LINKEDIN_CAMPAIGN.EDIT_FOLLOW_UP_CAMPAIGN_TEMPLATE]: async () => {
      const { campaignId, folowUpCampaignTemplate } = data
      const allCampaigns = await updateCampaignData(campaignId, { folowUpCampaignTemplate })
      return allCampaigns
    },
    [LINKEDIN_CAMPAIGN.COLLECT_PROFILES]: async () => {
      const { campaignId, collectingProfiles } = data
      const allCampaigns = await updateCampaignData(campaignId, { collectingProfiles })
      return allCampaigns
    },
    [LINKEDIN_CAMPAIGN.PROCESS_PROFILES]: async () => {
      const { campaignId, processingProfiles } = data
      const allCampaigns = await updateCampaignData(campaignId, { processingProfiles })
      return allCampaigns
    },
  }

  const response = await responseObj[action]()
  console.log(response, '--------data')

  return response
})
