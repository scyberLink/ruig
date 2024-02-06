/* eslint-disable require-jsdoc */
import SharedConfig from "./SharedConfig";
import md5, { rand } from "./md5";
import { API_VERSION, BASE } from "../configs/RestEndpoints";
import axios from "axios";
import IAnyObject from "./models/IAnyObject";

class Fetcher {
  static RETURN_JSON_OBJECT = 2;
  static RETURN_RESPONSE_OBJECT = 1;
  static RETURN_BLOB = 3;
  static instance: Fetcher;
  
  base_url: string;
  listeners: IAnyObject;
  frequency: number;
  FAIL_SAFE_THRESHOLD: number;

  constructor() {
    this.base_url = `${BASE}/${API_VERSION}`;
    this.listeners = {};
    this.frequency = 30000;
    this.FAIL_SAFE_THRESHOLD = 500;
  }

  addListenerForUrl(
    fetchOptions: any,
    listener: (arg0: any) => void,
    frequency = this.frequency,
    returnType = Fetcher.RETURN_JSON_OBJECT,
    failstop = this.FAIL_SAFE_THRESHOLD
  ) {
    if (!fetchOptions) throw new Error("Invalid fetch options provided");
    if (!listener) throw new Error("Invalid listener provided");
    if (!returnType) throw new Error("Invalid returnType provided");
    if (!frequency) throw new Error("Invalid frequency provided");
    if (!failstop) throw new Error("Invalid failstop provided");
    const id = this.getId();
    const intervalId = setInterval(async () => {
      const intervalOwner = this.listeners[id];
      const hasReachThreshHold =
        intervalOwner.fail - intervalOwner.success >= failstop;
      try {
        const data = await this.fetch(fetchOptions, returnType);
        if (data) {
          ++intervalOwner.success;
          listener(data);
        } else {
          if (hasReachThreshHold) {
            this.removeListener(id);
          } else {
            ++intervalOwner.fail;
          }
        }
      } catch (e) {
        if (hasReachThreshHold) {
          this.removeListener(id);
        } else {
          ++intervalOwner.fail;
        }
      }
    }, frequency);
    this.listeners[id] = {
      fetchOptions: fetchOptions,
      listener: listener,
      intervalId: intervalId,
      fail: 0,
      success: 0,
    };
    return id;
  }

  removeListener(id: any) {
    if (!id || id === "") throw Error("Id required to remove listener");
    if (Object.hasOwnProperty.call(this.listeners, id)) {
      this.clear(this.listeners[id].intervalId);
      delete this.listeners[id];
    }
  }

  async release() {
    return new Promise((resolve) => {
      let listenersArr = Object.values(this.listeners);
      listenersArr.forEach((listener) => {
        this.clear(listener.intervalId);
      });
      this.listeners = {};
      listenersArr = [];
      resolve(true);
    });
  }

  async fetch(options: IAnyObject, returnType = Fetcher.RETURN_JSON_OBJECT) {
    let url;
    const defaultOptions = {
      method: "POST",
    };
    if (typeof options === "string") {
      url = options;
      defaultOptions.method = "GET";
      options = defaultOptions;
    } else {
      url = options.url;
      if (url) {
        delete options.url;
      } else {
        throw new Error("URL not found in options");
      }
      options = { ...defaultOptions, ...options };
    }
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": " no-cache",
      ...options.headers,
    };
    const auth = SharedConfig?.getLocalData("auth");
    auth && (options.headers["Authorization"] = auth);
    if (url.search("http") < 1) {
      url = `${this.base_url}${url}`;
    }
    options = { url, ...options };
    returnType == Fetcher.RETURN_BLOB &&
      (options = { ...options, responseType: "blob" });
    let res;
    try {
      res = await axios(options);
    } catch (err: any) {
      if (!err?.response?.data) {
        throw new Error(err.message);
      }
      res = err.response;
    }
    const data = res?.data;
    if (data?.connection?.statusCode == 401) {
      SharedConfig.destroyLocalData();
    }
    return returnType == Fetcher.RETURN_RESPONSE_OBJECT ? res : data;
  }

  clear(intervalId: any) {
    clearInterval(intervalId);
  }

  getId() {
    let id = md5(`${rand()}`);
    while (Object.hasOwnProperty.call(this.listeners, id)) {
      id = md5(rand());
    }
    return id;
  }
}

export default Fetcher;
