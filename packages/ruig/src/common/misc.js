/* eslint-disable require-jsdoc */
import { fetcher } from './SharedFetcher';
import { FetcherResponseType } from './Fetcher';
export const isActivePath = (routeName) => {
    const path = window.location.pathname;
    const splitted = path.split('/');
    for (let i = 0; i < splitted.length; i++) {
        const segment = splitted[i];
        const routing = routeName.split('/')[1];
        if (segment === routing) {
            return 'active';
        }
    }
    return null;
};
export function objectEquals(obj1, obj2) {
    // Check if both object are strictly equal
    if (obj1 === obj2) {
        return true;
    }
    // Check if either object is null or not
    if (typeof obj1 !== 'object' || obj1 == null || typeof obj2 !== 'object' || obj2 == null) {
        return false;
    }
    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    // Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
        return false;
    }
    // Iterate through the keys and recursively check for equality
    for (const key of keys1) {
        if (!keys2.includes(key) || !objectEquals(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}
export function encodeQuery(object = {}) {
    return btoa(JSON.stringify(object));
}
export async function getDataUrl(data) {
    return await new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = () => {
                const uri = reader.result;
                resolve(uri);
            };
        }
        catch (err) {
            reject(err);
        }
    });
}
export async function getDataUrlFromUrl(url) {
    return await new Promise((resolve, reject) => {
        async function runner() {
            try {
                const imo = {
                    url,
                    method: 'GET',
                };
                const idata = (await fetcher.fetch(imo, FetcherResponseType.BLOB));
                const uri = await getDataUrl(idata);
                resolve(uri);
            }
            catch (err) {
                reject(err);
            }
        }
        runner();
    });
}
export const getCurrentUrl = (includeHostName = false) => {
    const url = window.location.href;
    if (includeHostName) {
        return url;
    }
    const noScheme = url?.split('//')[1];
    const pathWithoutShemeAndHostname = noScheme?.split('/')[1];
    return `../${pathWithoutShemeAndHostname}`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pc2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFHL0MsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsU0FBaUIsRUFBRSxFQUFFO0lBQ2hELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFBO0lBQ3JDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNCLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkMsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQ3ZCLE9BQU8sUUFBUSxDQUFBO1NBQ2hCO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQTtBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsSUFBZ0IsRUFBRSxJQUFnQjtJQUM3RCwwQ0FBMEM7SUFDMUMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCx3Q0FBd0M7SUFDeEMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtRQUN4RixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQs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