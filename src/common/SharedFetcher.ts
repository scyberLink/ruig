/* eslint-disable require-jsdoc */
import Fetcher from './Fetcher'

class SharedFetcher extends Fetcher {
  constructor() {
    if (!SharedFetcher.instance) {
      super()
      SharedFetcher.instance = this
    }
    return SharedFetcher.instance
  }
}

const fetcher = new SharedFetcher()
export default fetcher
