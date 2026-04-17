export const EVENTS = {
  HOME_VIEWED: "home_viewed",
  HOME_SIGNUP_BUTTON_CLICKED: "home_signup_button_clicked",
  HOME_DOWNLOAD_BUTTON_CLICKED: "home_download_button_clicked",
} as const;

export type ButtonLocation = "header" | "hero" | "footer";

export const GTM_BRIDGE_EVENTS: Record<string, string> = {
  [EVENTS.HOME_SIGNUP_BUTTON_CLICKED]: "conversion_signup_click",
  [EVENTS.HOME_DOWNLOAD_BUTTON_CLICKED]: "conversion_download_click",
};
