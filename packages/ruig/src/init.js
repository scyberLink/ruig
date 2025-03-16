import { register } from './customElementRegistration';
import { AppContainer } from './layers/view/application/components/base/AppContainer';
const initAppContainer = () => {
    register();
    const appContainer = new AppContainer();
    appContainer.style.minWidth = process.env.REACT_APP_MIN_WIDTH ?? '100vw';
    appContainer.style.minHeight = process.env.REACT_APP_MIN_HEIGHT ?? '100vh';
    // reportWebVitals(console.log);
    if ('serviceWorker' in navigator) {
        if (!navigator.serviceWorker.controller) {
            navigator.serviceWorker.register('sw.js').catch((error) => {
                console.error('Worker registration failed:', error);
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then((registrations) => {
                        registrations.forEach((registration) => {
                            registration.unregister();
                            console.log('Service worker unregistered successfully:', registration);
                        });
                    });
                }
            });
        }
    }
    return appContainer;
};
export { initAppContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3REFBd0QsQ0FBQTtBQUVyRixNQUFNLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtJQUM1QixRQUFRLEVBQUUsQ0FBQTtJQUVWLE1BQU0sWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUE7SUFFdkMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBb0IsSUFBSSxPQUFPLENBQUE7SUFDekUsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBcUIsSUFBSSxPQUFPLENBQUE7SUFDM0UsZ0NBQWdDO0lBRWhDLElBQUksZUFBZSxJQUFJLFNBQVMsRUFBRTtRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDdkMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUE7Z0JBRW5ELElBQUksZUFBZSxJQUFJLFNBQVMsRUFBRTtvQkFDaEMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO3dCQUNoRSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7NEJBQ3JDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQTs0QkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFBRSxZQUFZLENBQUMsQ0FBQTt3QkFDeEUsQ0FBQyxDQUFDLENBQUE7b0JBQ0osQ0FBQyxDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDLENBQUMsQ0FBQTtTQUNIO0tBQ0Y7SUFDRCxPQUFPLFlBQVksQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQSJ9