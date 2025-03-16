/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import { YEAR } from './constants';
class Cookie {
    name;
    value;
    maxAge;
    path;
    constructor(name, value, maxAge = YEAR, path = '/') {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        this.name = name;
        this.value = value;
        this.maxAge = Date.now() + maxAge;
        this.path = path;
        this.set();
    }
    set() {
        document.cookie = `${this.name}=${encodeURIComponent(this.value)}; max-age=${this.maxAge}; path=${this.path}`;
    }
    static get(name, returnJsonIfPossible = true) {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            if (cookie[0] === name) {
                let value = decodeURIComponent(cookie[1]);
                if (returnJsonIfPossible) {
                    try {
                        const converted = JSON.parse(value);
                        if (converted) {
                            value = converted;
                        }
                    }
                    catch (error) {
                        /* empty */
                    }
                }
                return value;
            }
        }
        return null;
    }
    static delete(name) {
        document.cookie = `${name}=; max-age=-1; path=/;`;
    }
    static has(key) {
        return Cookie.get(key) || false;
    }
    static replace(name, value, maxAge = YEAR, path = '/') {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        new Cookie(name, value, maxAge, path);
        const stored = Cookie.get(name);
        return stored || false;
    }
}
export { Cookie };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29va2llLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29va2llLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVEQUF1RDtBQUN2RCxrQ0FBa0M7QUFDbEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUVsQyxNQUFNLE1BQU07SUFDVixJQUFJLENBQVE7SUFDWixLQUFLLENBQUs7SUFDVixNQUFNLENBQVE7SUFDZCxJQUFJLENBQVE7SUFFWixZQUFZLElBQVksRUFBRSxLQUFVLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBRSxJQUFJLEdBQUcsR0FBRztRQUM3RCxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUM1QixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUM5QjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDWixDQUFDO0lBRUQsR0FBRztRQUNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLENBQUMsTUFBTSxVQUFVLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUMvRyxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFZLEVBQUUsb0JBQW9CLEdBQUcsSUFBSTtRQUNsRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDdEIsSUFBSSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pDLElBQUksb0JBQW9CLEVBQUU7b0JBQ3hCLElBQUk7d0JBQ0YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDbkMsSUFBSSxTQUFTLEVBQUU7NEJBQ2IsS0FBSyxHQUFHLFNBQVMsQ0FBQTt5QkFDbEI7cUJBQ0Y7b0JBQUMsT0FBTyxLQUFLLEVBQUU7d0JBQ2QsV0FBVztxQkFDWjtpQkFDRjtnQkFDRCxPQUFPLEtBQUssQ0FBQTthQUNiO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVk7UUFDeEIsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksd0JBQXdCLENBQUE7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBVztRQUNwQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFBO0lBQ2pDLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQVksRUFBRSxLQUFVLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBRSxJQUFJLEdBQUcsR0FBRztRQUNoRSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUM1QixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUM5QjtRQUNELElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDL0IsT0FBTyxNQUFNLElBQUksS0FBSyxDQUFBO0lBQ3hCLENBQUM7Q0FDRjtBQUVELE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQSJ9