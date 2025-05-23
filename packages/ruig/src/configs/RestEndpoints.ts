export const BASE =
  process.env.ENVIRONMENT !== 'production'
    ? `${window.location.protocol.includes('s:') ? 'https' : 'http'}://${window.location.hostname}:5000`
    : process.env.REBLEND_APP_API_URL

export const API_VERSION = 'v1'

export const ACCEPT_TRADE = '/trade/accept'

export const BUILTIN_EXTENSION = '/builtin-extension/'
export const EXTENSION = '/extension/'
