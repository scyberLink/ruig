import { BaseComponent } from './base/BaseComponent';
class ParserContainer extends BaseComponent {
    constructor(style) {
        super({
            display: 'none',
            position: 'initial',
            ...(style ?? {}),
        });
    }
    parse(html = '') {
        this.innerHTML = html;
        const parsed = [];
        for (const child of this.children) {
            parsed.push(child);
        }
        this.innerHTML = '';
        return parsed;
    }
}
export { ParserContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUGFyc2VyQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUdwRCxNQUFNLGVBQWdCLFNBQVEsYUFBYTtJQUN6QyxZQUFZLEtBQWtCO1FBQzVCLEtBQUssQ0FBQztZQUNKLE9BQU8sRUFBRSxNQUFNO1lBQ2YsUUFBUSxFQUFFLFNBQVM7WUFDbkIsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUE7UUFDaEMsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBb0IsQ0FBQyxDQUFBO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7UUFDbkIsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0NBQ0Y7QUFFRCxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUEifQ==