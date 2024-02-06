export const BASE = process.env.ENVIRONMENT !== 'production'
  ? `${
  window.location.protocol.includes('s:') ? 'https' : 'http'
}://${window.location.hostname}:5000`
  : process.env.REACT_APP_API_URL

export const API_VERSION = 'v1'

export const ACCEPT_TRADE = '/trade/accept'

export const LOGIN = '/user/login'
export const USER_BASE = '/user'
export const CREATE_USER = '/user'
export const SEND_VERIFICATION = '/user/send-verification-mail/'
export const VERIFY_MAIL = '/user/verify-mail/'

export const SEND_OTP = '/user/send-otp-mail/'
export const SEND_FORGET_PASSWORD_VERIFICATION = '/user/send-forget-password-mail/'
export const VERIFY_FORGET_PASSWORD_MAIL = '/user/verify-forget-password'
export const ALL_USER = '/user/all'
export const ALL_USER_PROFILE = '/user-profile/all'
export const USER_PACKAGE = '/user/package/'
export const USER_PLAN = '/user/plan/'
export const USER_AUTO_TRADE_PLAN = '/user/auto-trade-plan/'
export const USER_DETAIL = '/user/detail/'
export const CHANGE_PIN = '/user/change-pin/'
export const CHANGE_PASSWORD = '/user/change-password/'

export const TRADE = '/trade/'
export const CREATE_TRADE = '/trade'
export const ALL_TRADE = '/trade/all'
export const ALL_TRADE_TRANSACTION = '/trade-transaction/all'

export const DEPOSIT = '/deposit'
export const GENERATE_DEPOSIT = '/deposit'

export const WITHDRAW = '/withdraw'
export const REQUEST_WITHDRAW = '/withdraw'

export const NETWORK = '/network/'
export const CREATE_NETWORK = '/network'
export const ALL_NETWORK = '/network/all'

export const PACKAGE = '/package/'
export const CREATE_PACKAGE = '/package'
export const ALL_PACKAGE = '/package/all'
export const CREATE_PACKAGE_TRANSACTION = '/package-transaction'
export const RENEW_PACKAGE_TRANSACTION = '/package-transaction/renew'
export const ALL_PACKAGE_TRANSACTION = '/package-transaction/all'

export const EXCHANGER = '/exchanger/'
export const CREATE_EXCHANGER = '/exchanger'
export const ALL_EXCHANGER = '/exchanger/all'
export const ALL_EXCHANGER_TRANSACTION = '/exchanger-transaction/all'

export const OPTION = '/option/'
export const CREATE_OPTION = '/option'
export const ALL_OPTION = '/option/all'

export const TOKEN = '/token/'
export const CREATE_TOKEN = '/token'
export const ALL_TOKEN = '/token/all'

export const TRANSACTION_TOKEN = '/transaction-token/'
export const CREATE_TRANSACTION_TOKEN = '/transaction-token'
export const ALL_TRANSACTION_TOKEN = '/transaction-token/all'

export const SIGNAL = '/signal/'
export const CREATE_SIGNAL = '/signal'
export const ALL_SIGNAL = '/signal/all'

export const TRANSACTION = '/transaction/'
export const CREATE_TRANSACTION = '/transaction'
export const ALL_TRANSACTION = '/transaction/all'
export const ALL_PROFIT_TRANSACTION = '/transaction/profit/all'
export const ALL_SALES_TRANSACTION = '/sales-wallet/all'

export const ALL_COUNTRIE = '/countrie/all'
export const COUNTRIE = '/countrie/'

export const ALL_STATE = '/state/all'

export const TOKEN_NETWORK = TOKEN + 'network/'

export const LOGGED = '/user/logged'

export const WALLET_BALANCE = '/wallet/balance/'

export const PROFIT_WALLET_BALANCE = '/profit-wallet/balance/'

export const SALES_WALLET_BALANCE = '/sales-wallet/balance/'

export const WITHDRAWABLE_AMOUNT = '/wallet/withdrawable/'

export const PROFIT_WITHDRAWABLE_AMOUNT = '/profit-wallet/withdrawable/'

export const UPDATE_TRANSACTION_HASH = '/transaction/hash'

export const USER_EXCHANGERS = '/user/exchangers/'
export const LOAD_EXCHANGER = '/exchanger-transaction'
export const WITHDRAW_EXCHANGER = '/exchanger-transaction/withdraw'
export const CLEAR_EXCHANGER = '/exchanger-transaction/clear/'

export const CONFIRM_USER = '/wallet/confirm-user/'

export const TRANSFER = '/wallet/transfer'

export const PROFIT_TRANSFER = '/profit-wallet/transfer'

export const SALES_TRANSFER = '/sales-wallet/transfer'

export const PROFIT_WITHDRAW = '/profit-wallet/withdraw'

export const SALES_WITHDRAW = '/sales-wallet/withdraw'

export const DEFAULT_TOKEN = '/token/default'

export const PRIVATE_FILE = '/prf/'
export const PUBLIC_FILE = '/puf/'

export const TOP_GAINER = '/top-gainer'

export const PUBLIC_OPTIONS = '/option/publics'

export const TOP_EXCHANGER = '/top-exchanger'

export const USER_SETTINGS = '/user-setting/'
export const ALL_USER_SETTINGS = '/user-setting/all'

export const USER_SETTING = '/user-setting/'
export const USER_SETTING_RESET = '/user-setting/reset/'
export const CREATE_USER_SETTING = '/user-setting'
export const ALL_USER_SETTING = '/user-setting/all'

export const SETTING_CATEGORY = '/setting-category/'
export const CREATE_SETTING_CATEGORY = '/setting-category'
export const ALL_SETTING_CATEGORY = '/setting-category/all'

export const SETTING = '/setting/'
export const CREATE_SETTING = '/setting'
export const ALL_SETTING = '/setting/all'

export const REFERRAL_EARNING = '/referral-earning/'
export const CREATE_REFERRAL_EARNING = '/referral-earning'
export const ALL_REFERRAL_EARNING = '/referral-earning/all'

export const AUTO_TRADE_DURATION = '/auto-trade-duration/'
export const CREATE_AUTO_TRADE_DURATION = '/auto-trade-duration'
export const ALL_AUTO_TRADE_DURATION = '/auto-trade-duration/all'

export const AUTO_TRADE_PLAN = '/auto-trade-plan/'
export const CREATE_AUTO_TRADE_PLAN = '/auto-trade-plan'
export const AUTO_TRADE_PLAN_RENEWAL = '/auto-trade-plan/renew'
export const ALL_AUTO_TRADE_PLAN = '/auto-trade-plan/all'

export const AUTO_TRADE_PLAN_TRANSACTION = '/auto-trade-plan-transaction/'
export const CREATE_AUTO_TRADE_PLAN_TRANSACTION =
  '/auto-trade-plan-transaction'
export const ALL_AUTO_TRADE_PLAN_TRANSACTION =
  '/auto-trade-plan-transaction/all'

export const AUTO_TRADE_SETTING = '/auto-trade-setting/'
export const CREATE_AUTO_TRADE_SETTING = '/auto-trade-setting'
export const ALL_AUTO_TRADE_SETTING = '/auto-trade-setting/all'

export const USER_AUTO_TRADE_SETTING = '/user-auto-trade-setting/'
export const CREATE_USER_AUTO_TRADE_SETTING = '/user-auto-trade-setting'
export const ALL_USER_AUTO_TRADE_SETTING = '/user-auto-trade-setting/all'

export const TEAM_SALES = '/team-sales/'
export const CREATE_TEAM_SALES = '/team-sales'
export const ALL_TEAM_SALES = '/team-sales/all'
export const TEAM_SALES_SUMMARY = '/team-sales/summary'

export const REFERRAL_LEVEL = '/referral-level/'
export const CREATE_REFERRAL_LEVEL = '/referral-level'
export const ALL_REFERRAL_LEVEL = '/referral-level/all'
