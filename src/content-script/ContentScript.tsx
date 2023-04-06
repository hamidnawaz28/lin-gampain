import { Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { campaignHeaders } from '../common/constants'
import {
  ActionButton,
  AddIconButton,
  Dialog as DialogContainer,
  Modal,
  ProfileCard,
  ScrapingLoader,
  Table,
  Tabs,
} from './components'

const ContentScript = () => {
  const [expanded, setExpanded] = useState(true)
  const [loading, setLoading] = useState(false)

  const campaignOptions = [
    { value: 'new', label: 'New', components: <NewCampaign /> },
    { value: 'follow-up', label: 'Follow-up', components: <FollowUp /> },
  ]
  const [campaignType, setCampaignType] = useState(campaignOptions[0].value)
  const tabsObj: any = {
    new: <NewCampaign />,
    'follow-up': <FollowUp />,
  }

  return (
    <DialogContainer
      expanded={expanded}
      setExpanded={setExpanded}
      loading={loading}
      setLoading={setLoading}
    >
      <Tabs options={campaignOptions} value={campaignType} setValue={setCampaignType} />
      {tabsObj[campaignType]}
    </DialogContainer>
  )
}
export default ContentScript

const NewCampaign = () => {
  const [title, setTitle] = useState('')
  const [scraping, setScraping] = useState(false)
  const [campaigns, setCampaigns] = useState([
    {
      title: 'find new people',
      profiles: [
        {
          id: 1,
          src: '/static/images/avatar/1.jpg',
          name: 'Hamid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 2,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 3,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 4,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
      ],
    },
    {
      title: 'find new people',
      profiles: [
        {
          id: 1,
          src: '/static/images/avatar/1.jpg',
          name: 'Hamid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 2,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 3,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 4,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
      ],
    },
    {
      title: 'find new people',
      profiles: [
        {
          id: 1,
          src: '/static/images/avatar/1.jpg',
          name: 'Hamid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 2,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
      ],
    },
    {
      title: 'find new people',
      profiles: [
        {
          id: 1,
          src: '/static/images/avatar/1.jpg',
          name: 'Hamid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 2,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
        {
          id: 3,
          src: '/static/images/avatar/1.jpg',
          name: 'Junaid nawaz',
          caption: 'Full stack developer at we are nova',
        },
      ],
    },
  ])
  const [profiles, setProfiles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const handleNewCampaign = async () => {
    setScraping(true)
    // const campaignId = await Browser.runtime.sendMessage({
    //   action: LINKEDIN_CAMPAIGN.CREATE_CAMPAIGN,
    //   data: {
    //     title,
    //   },
    // })
    // window.location.href =
    //   'https://www.linkedin.com/search/results/people/?geoUrn=%5B%22101282230%22%5D&network=%5B%22O%22%5D&origin=FACETED_SEARCH&sid=2Kq'

    const intervalRef = setInterval(async () => {
      const allProfilesRef = document?.querySelectorAll('.reusable-search__result-container')
      if (allProfilesRef) {
        const discoveredProfiles = Array.from(allProfilesRef).map((el: any) => {
          const link = el.querySelector('.app-aware-link').href
          const pathname = new URL(link).pathname
          const pathnameArr = pathname.split('/')
          const profileId = pathnameArr[pathnameArr.length - 1]
          const image = el.querySelector('img.presence-entity__image').src
          const name = el.querySelector('.app-aware-link>span>span:nth-child(1)')?.innerText
          const roleAndCompany = el.querySelector('.linked-area>div:nth-child(1)')?.innerText
          const location = el.querySelector('.linked-area>div:nth-child(2)')?.innerText
          return {
            url: link,
            processed: false,
            profileId,
            name,
            image,
            roleAndCompany,
            location,
          }
        })
        clearInterval(intervalRef)

        // await Browser.runtime.sendMessage({
        //   action: LINKEDIN_CAMPAIGN.ADD_PROFILES,
        //   data: {
        //     campaignId,
        //     profilesData: discoveredProfiles,
        //   },
        // })
        initData()
      }
    }, 1000)
  }

  const titleChangeHandle = (e: any) => {
    setTitle(e.target.value)
  }

  const initData = async () => {
    // const allCampaigns = await Browser.runtime.sendMessage({
    //   action: LINKEDIN_CAMPAIGN.GET_ALL_CAMPAIGNS,
    // })
    // setCampaigns(allCampaigns)
    // setProfiles(allCampaigns?.[0]?.profiles || [])
  }
  const showModalHandle = () => {
    setShowModal((prevVal) => !prevVal)
  }
  useEffect(() => {
    initData()
  }, [])
  const onDelete = (id: any) => {
    console.log(id, 'deleted')
  }
  return (
    <Box>
      {!scraping && (
        <Box sx={{ display: 'flex', flexDirection: 'row', gridGap: 10, pt: 3 }}>
          <AddIconButton onClick={showModalHandle} />
          <Modal setShow={showModalHandle} show={showModal}>
            <TextField
              size="small"
              label="Title (*)"
              variant="filled"
              value={title}
              onChange={titleChangeHandle}
            />
            <TextField
              size="small"
              label="Purpose (*)"
              variant="filled"
              value={title}
              onChange={titleChangeHandle}
              multiline
              maxRows={3}
            />
            <ActionButton onClick={handleNewCampaign} label={'Add'} />
          </Modal>
        </Box>
      )}

      <ScrapingLoader scraping={scraping} />
      <Table headers={campaignHeaders} data={campaigns} />

      <ActionButton onClick={handleNewCampaign} label={'Start'} />
      <ProfileCard profiles={campaigns?.[0]?.profiles || []} onDelete={onDelete} />
    </Box>
  )
}

const FollowUp = () => {
  return <Box></Box>
}
