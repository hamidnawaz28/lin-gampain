const campaignHeaders = [
  {
    label: 'Title',
    value: 'title',
  },
  {
    label: 'Profiles',
    value: 'profiles',
    valMap: (value: any) => value?.length || 0,
  },
]

const profileHeaders = [
  {
    label: 'name',
    value: 'name',
  },
  {
    label: 'roleAndCompany',
    value: 'roleAndCompany',
  },
  {
    label: 'location',
    value: 'location',
  },
]
export { campaignHeaders, profileHeaders }
