export const inactiveStatuses = [
  'Approved',
  'Cancelled',
  'Closed',
  'Done',
  'Rejected',
];

export const activeStatuses = [
  'Draft',
  'To Do',
  'Open',
  'In Progress',
  'In Review',
  'Under Review',
];

export const activesInactiveStatuses = [activeStatuses, inactiveStatuses];

export default {
  Active: () => (activeStatuses),
  Inactive: () => (inactiveStatuses),
  List: () => ([...activeStatuses, ...inactiveStatuses])
}
