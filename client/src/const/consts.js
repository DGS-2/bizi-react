export const KeyCodes = {
  comma: 188,
  enter: 13,
};

export const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const priorityOptions = [
  { label: '* Select Priority Level', value: 0 },
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

