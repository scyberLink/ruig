/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileManagement } from '../common/FileManagement';
import { notfound } from '../common/notfound';
const extensionStore = 'extension-store';
self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
        if (event.request.url.includes(extensionStore)) {
            const path = extensionStore + event.request.url.split(extensionStore).pop();
            const filemanager = new FileManagement();
            await filemanager.open();
            const file = await filemanager.getFile(path);
            const mime = file?.mime || 'text/html';
            const content = file?.fileContent || notfound;
            const status = file?.fileContent ? 200 : 404;
            const statusText = file?.fileContent ? 'Success' : 'Not Found';
            const blob = new Blob([content], { type: mime });
            const res = new Response(blob, { status, statusText });
            return res;
        }
        return fetch(event.request).catch((error) => {
            console.log('Fetch failed:', error);
        });
    })());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU3QyxNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQTtBQUV4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7SUFDNUMsS0FBSyxDQUFDLFdBQVcsQ0FDZixDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ1YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEdBQUcsY0FBYyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUMzRSxNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFBO1lBQ3hDLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxJQUFJLFdBQVcsQ0FBQTtZQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLEVBQUUsV0FBVyxJQUFJLFFBQVEsQ0FBQTtZQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtZQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtZQUM5RCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFFaEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7WUFFdEQsT0FBTyxHQUFHLENBQUE7U0FDWDtRQUVELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyQyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxFQUFFLENBQ0wsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIn0=