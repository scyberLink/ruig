/* eslint-disable require-jsdoc */
import { Fetcher } from './Fetcher';
class SharedFetcher extends Fetcher {
    constructor() {
        if (!SharedFetcher.instance) {
            super();
            SharedFetcher.instance = this;
        }
        return SharedFetcher.instance;
    }
}
const fetcher = new SharedFetcher();
export { fetcher };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmVkRmV0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNoYXJlZEZldGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFFbkMsTUFBTSxhQUFjLFNBQVEsT0FBTztJQUNqQztRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQzNCLEtBQUssRUFBRSxDQUFBO1lBQ1AsYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7U0FDOUI7UUFDRCxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUE7SUFDL0IsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQTtBQUNuQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUEifQ==