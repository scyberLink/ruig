import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { ExtensionManager } from './extension/page/ExtensionManager';
function App({ extensions = [], appContainer }) {
    const [showingExtension, setShowingExtension] = useState(false);
    useEffect(() => {
        const body = document.getElementById('app');
        body?.appendChild(appContainer);
        for (const extension of extensions) {
            new extension(appContainer);
        }
        return () => {
            body?.removeChild(appContainer);
        };
    }, []);
    const openExtensionDialog = (e) => {
        e.preventDefault();
        appContainer.toggleDisplay();
        setShowingExtension(!showingExtension);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { id: "app", children: [_jsxs("div", { style: {
                        position: 'fixed',
                        zIndex: '999999',
                        top: 0,
                        right: 0,
                        width: '20px',
                        height: '40px',
                        border: 0,
                        borderRadius: '5px',
                    }, children: [_jsx("button", { onClick: openExtensionDialog, style: {
                                background: showingExtension ? 'blue' : 'red',
                                height: '20px',
                            } }), _jsx("a", { href: "./", style: {
                                background: 'pink',
                                height: '20px',
                            }, children: "R" })] }), showingExtension ? _jsx(ExtensionManager, {}) : _jsx(_Fragment, {})] }) }));
}
export { App };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdURBQXVEO0FBQ3ZELE9BQWMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBR2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFBO0FBRXBFLFNBQVMsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQWdFO0lBQzFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUUvRCxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFlBQTJCLENBQUMsQ0FBQTtRQUM5QyxLQUFLLE1BQU0sU0FBUyxJQUFJLFVBQVUsRUFBRTtZQUNsQyxJQUFLLFNBQWlCLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDckM7UUFFRCxPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDakMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRU4sTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQ3JDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUNsQixZQUFZLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDNUIsbUJBQW1CLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3hDLENBQUMsQ0FBQTtJQUVELE9BQU8sQ0FDTCw0QkFDRSxlQUFLLEVBQUUsRUFBQyxLQUFLLGFBQ1gsZUFDRSxLQUFLLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLE9BQU87d0JBQ2pCLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixHQUFHLEVBQUUsQ0FBQzt3QkFDTixLQUFLLEVBQUUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsTUFBTTt3QkFDYixNQUFNLEVBQUUsTUFBTTt3QkFDZCxNQUFNLEVBQUUsQ0FBQzt3QkFDVCxZQUFZLEVBQUUsS0FBSztxQkFDcEIsYUFFRCxpQkFDRSxPQUFPLEVBQUUsbUJBQW1CLEVBQzVCLEtBQUssRUFBRTtnQ0FDTCxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSztnQ0FDN0MsTUFBTSxFQUFFLE1BQU07NkJBQ2YsR0FDRCxFQUVGLFlBQ0UsSUFBSSxFQUFDLElBQUksRUFDVCxLQUFLLEVBQUU7Z0NBQ0wsVUFBVSxFQUFFLE1BQU07Z0NBQ2xCLE1BQU0sRUFBRSxNQUFNOzZCQUNmLGtCQUdDLElBQ0EsRUFDTCxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBQyxnQkFBZ0IsS0FBRyxDQUFDLENBQUMsQ0FBQyxtQkFBSyxJQUM1QyxHQUNMLENBQ0osQ0FBQTtBQUNILENBQUM7QUFFRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUEifQ==