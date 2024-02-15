var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetcher from '../common/SharedFetcher';
import { APPCONTAINER, EXTENSION_SCRIPT } from '../common/constants';
import { BUILTIN_EXTENSION, EXTENSION } from '../configs/RestEndpoints';
class ExtensionLoader {
    constructor(appContainer) {
        this.appContainer = appContainer;
    }
    load(id, builtin = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = (yield fetcher.fetch(`${builtin ? BUILTIN_EXTENSION : EXTENSION}${id}`));
            if (!res || !res.data || !res.data.status) {
                return false;
            }
            const executor = new Function(APPCONTAINER, `
        ${res.data[EXTENSION_SCRIPT]}
        return new Extension(${APPCONTAINER})
      `);
            return executor(this.appContainer);
        });
    }
}
export default ExtensionLoader;
