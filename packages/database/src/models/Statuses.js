export const inactiveStatuses = [
  'Approved',
  'Cancelled',
  'Closed',
  'Done',
  'Rejected',
];

export const preactiveStatuses = [
  'Draft',
  'To Do',
];

export const reviewStatuses = [
  'In Review',
  'Under Review',
];

export const activeStatuses = [
    ...preactiveStatuses,
  'Open',
  'In Progress',
    ...reviewStatuses,
];

export const activesInactiveStatuses = [activeStatuses, inactiveStatuses];

export default {
  Active: () => (activeStatuses),
  Inactive: () => (inactiveStatuses),
  List: () => ([...activeStatuses, ...inactiveStatuses]),
  PreActive: () => (preactiveStatuses),
}
