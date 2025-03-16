/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IData {
  status: boolean
  message: string
  [key: string | number]: any
}

export interface IConnectInfo {
  endpoint: string
  statusCode: number | string
  authToken: string
  errorCode?: number | string
  uid: number
}

export interface IFetchData {
  connection: IConnectInfo
  data: IData | null
  [key: string | number]: any
}
