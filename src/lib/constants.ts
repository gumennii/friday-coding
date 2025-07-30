// Application configuration constants

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
} as const;

export const UI = {
  DEBOUNCE_DELAY: 300, // ms - for future client-side features
  SKELETON_ROWS: 10,
} as const;

export const SEARCH = {
  MIN_QUERY_LENGTH: 2,
} as const;
