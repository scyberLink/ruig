import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
// import reportWebVitals from './common/reportWebVitals'
import AppContainer from './layers/view/application/components/base/AppContainer';
import ExtensionPool from './extension/ExtensionPool';
import { Link } from 'react-router-dom';
import { EXTENSION } from './configs/RestEndpoints';
function App() {
    useEffect(() => {
        var _a, _b;
        const appContainer = new AppContainer();
        appContainer.style.minWidth = (_a = process.env.REACT_APP_MIN_WIDTH) !== null && _a !== void 0 ? _a : '100vw';
        appContainer.style.minHeight = (_b = process.env.REACT_APP_MIN_HEIGHT) !== null && _b !== void 0 ? _b : '100vh';
        // reportWebVitals(console.log);
        const body = document.getElementById('app');
        body === null || body === void 0 ? void 0 : body.appendChild(appContainer);
        new ExtensionPool(appContainer).loadExtension();
    }, []);
    return (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ id: "app" }, { children: [_jsx(Link, Object.assign({ id: "extension", to: EXTENSION, style: {
                        background: 'red',
                        /* border: '1px solid red', borderRadius: '5px', */ position: 'fixed',
                        zIndex: '999999',
                        top: 0,
                        right: 0,
                        width: '10px',
                        height: '10px',
                    } }, { children: ' ' })), _jsx("style", { children: `
          #extension:before {
            content: '\\eb51';
          }
          ` })] })) }));
}
export default App;
