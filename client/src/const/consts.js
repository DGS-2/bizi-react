export const KeyCodes = {
  comma: 188,
  enter: 13,
};

export const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const priorityOptions = [
  { label: '', value: 0 },
  { label: 'Critical', value: 'Critical' },
  { label: 'Important', value: 'Important' }
]

export const taskActions = [
  { label: "* Select a reason", value: 0 },
  { label: "Similar Task Assigned", value: "Similar Task Assigned" },
  { label: "I No Longer Have Permissions For This Task", value: "I No Longer Have Permissions For This Task" },
  { label: "Previously Completed", value: "Previously Completed" }
]

export const overrideActions = [
  { label: "Override Dispute?", value: 0 },
  { label: "Yes", value: "true" },
]

export const verifyActions = [
  { label: "Verify Complete?", value: 0 },
  { label: "Yes", value: "true" },
]

export const groups = [
  { label: '* Please select your Group', value: 0 },
  { label: '548 ISRG', value: '548 ISRG' },
]

export const ranks = [
  { label: '', value: 0 },

  { label: 'Contractor', value: 'Ctr' },
  { label: 'Civilian', value: 'Civilian' },
  { label: 'Airman Basic', value: 'AB' },
  { label: 'Airman First Class', value: 'A1C' },
  { label: 'Senior Ariman', value: 'SrA' },
  { label: 'Staff Sergeant', value: 'SSgt' },
  { label: 'Technical Sergeant', value: 'TSgt' },
  { label: 'Master Sergeant', value: 'MSgt' },
  { label: 'Senior Master Sergeant', value: 'SMSgt' },
  { label: 'Chief Master Sergeant', value: 'CMSgt' },
  { label: 'Second Lieutenant', value: '2nd Lt' },
  { label: 'First Lieutenant', value: '1st Lt' },
  { label: 'Captain', value: 'Capt'},
  { label: 'Major', value: 'Maj' },
  { label: 'Lieutenant Colonel', value: 'Lt. Col' },
  { label: 'Colonel', value: 'Col' },
  { label: 'Brigadier General', value: 'Brig Gen' },
  { label: 'Major General', value: 'Maj Gen' },
  { label: 'Lieutenant General', value: 'Lt. Gen' },
  { label: 'General', value: 'Gen' }
]

export const squadrons = [
  { label: '* Please select your Squadron', value: 0 },
  { label: '9 IS', value: '9 IS' },
  { label: '13 IS', value: '13 IS' },
  { label: '48 IS', value: '48 IS' },
  { label: '548 OSS', value: '548 OSS' },
  { label: '548 ISRG', value: '548 ISRG' }
]

export const wings = [
  { label: '* Please select your Wing', value: 0 },
  { label: '480th ISRW', value: '480th ISRW' }
]

export const privilegeLevels = [
  { label: "* Please Select Privilege Level", value: 0, title: "" },
  { label: "User", value: 1, title: "User" },
  { label: "Supervisor", value: 2, title: "Supervisor" },
  { label: "NCOIC", value: 3, title: "NCOIC" },
  { label: "Section Chief", value: 4, title: "Section Chief" },

  { label: "Flight Chief", value: 6, title: "Flight Chief" },
  { label: "Flight Commander", value: 6, title: "Flight Commander" },

  { lable: "Squadron Program Manager", value: 7, title: "Squadron Progam Manager" },

  { label: "Senior Civilian", value: 8, title: "Senior Civilian" },
  { label: "Operations Superintendent", value: 8, title: "Operations Superintendent" },
  { label: "Director of Operations", value: 8, title: "Director of Operations" },

  { label: "Commander Support Staff", value: 9, title: "Commander Support Staff" },

  { label: "First Sergeant", value: 10, title: "First Sergeant" },

  { label: "Squadron Executive", value: 11, title: "Squadron Executive" },
  { label: "Squadron Superintendent", value: 11, title: "Squadron Superintendent" },
  { label: "Squadron Commander", value: 11, title: "Squadron Commander" },  
  
  { label: "Group Program Manager", value: 12, title: "Group Program Manager" },

  { label: "Group Director of Operations", value: 14, title: "Group Director of Operations" },

  { label: "Group Superintendent", value: 16, title: "Group Superintendent" },
  { label: "Group Executive", value: 16, title: "Group Executive" },
  { label: "Group Deputy Commander", value: 16, title: "Group Deputy Commander" },
  { label: "Group Commander", value: 16, title: "Group Commander" },

  { label: "Developer", value: 1000, title: "Developer" }
];

export const dgsSites = [
  { label: '', value: '' },
  { label: 'DGS-1', value: '1' },
  { label: 'DGS-2', value: '2' },
  { label: 'DGS-3', value: '3' },
  { label: 'DGS-4', value: '4' },
  { label: 'DGS-5', value: '5' },
]