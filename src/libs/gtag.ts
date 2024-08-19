/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export const GA_MEASUREMENT_ID = process.env.GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID as string, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
