/**
 * Storage keys constants
 * Format: app:v{version}:{domain}:{feature}:{identifier}
 */
export const STORAGE_KEYS = {
  FEEDBACK: {
    PAGE_VOTE: (path: string) => `app:v1:feedback:page_vote:${path}`,
  },
  CONSENT: {
    ANALYTICS: "app:v1:consent:analytics",
  },
  UI: {
    THEME: "app:v1:ui:theme",
    INDICATORS_VISIBLE: "app:v1:ui:indicators_visible",
  },
} as const;
