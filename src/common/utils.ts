import Browser from 'webextension-polyfill'

async function setStorage(data: any) {
  await Browser.storage.local.set({ linkedin: data })
}
async function getStorage() {
  const data = await Browser.storage.local.get()
  return data.linkedin
}

const createNewCampaign = async (title: string) => {
  const campaignId = Date.now()
  const prevData = await getStorage()

  const initData = {
    campaignId,
    title,
    type: 'new',
    campaignPurpose: '',
    collectingProfiles: false, // the user is collecting the profiles
    processingProfiles: false, // the user is processing the profiles
    active: true,
    newCampaignTemplate: '',
    folowUpCampaignTemplate: '',
    profiles: [],
  }
  const newData = [initData, ...prevData]
  await setStorage(newData)
  return campaignId
}

const readCampaignData = async (campaignId: string) => {
  const prevData = await getStorage()
  return prevData.find((campaign: any) => campaign.campaignId == campaignId)
}

const updateCampaignData = async (campaignId: string, data: any) => {
  const allCampaigns = await getStorage()
  const updatedData = []
  for (const campaign of allCampaigns) {
    if (campaign.campaignId == campaignId) {
      const newData = {
        ...campaign,
        ...data,
      }
      updatedData.push(newData)
    } else updatedData.push(campaign)
  }
  await setStorage(updatedData)
}

const deleteCampaignData = async (campaignId: string) => {
  const prevData = await getStorage()
  const updatedData = prevData.filter((campaign: any) => campaign.campaignId != campaignId)
  await setStorage(updatedData)
}

export {
  setStorage,
  getStorage,
  createNewCampaign,
  readCampaignData,
  updateCampaignData,
  deleteCampaignData,
}
