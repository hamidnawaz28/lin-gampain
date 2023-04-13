const campaignHeaders = [
  {
    type: 'value',
    label: 'Title',
    value: 'title',
  },
  {
    type: 'value',
    label: 'Profiles',
    value: 'profiles',
    valMap: (value: any) => value?.length || 0,
  },
  {
    type: 'component',
    label: 'Edit',
    component: 'edit',
  },
  {
    type: 'component',
    label: 'Delete',
    component: 'delete',
  },
]

const profileHeaders = [
  {
    type: 'value',
    label: 'name',
    value: 'name',
  },
  { type: 'value', label: 'Role And Company', value: 'roleAndCompany' },
  { type: 'value', label: 'Location', value: 'location' },
]
export { campaignHeaders, profileHeaders }
