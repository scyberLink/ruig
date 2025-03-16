import { BaseComponent } from '../base/BaseComponent';
import { ContextItemGroup } from './ContextItemGroup';
import { ContextSession } from './ContextSession';
class ContextContentContainer extends BaseComponent {
    sessions = [];
    constructor(style) {
        super({
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            ...(style ?? {}),
        });
    }
    async show(contextItems, config) {
        const group = {};
        for (const contextItem of contextItems) {
            if (!group[contextItem.groupName]) {
                group[contextItem.groupName] = [];
            }
            group[contextItem.groupName].push(contextItem);
        }
        const groups = [];
        for (const [groupName, groupItems] of Object.entries(group)) {
            const group = new ContextItemGroup();
            group.init(groupName, ...groupItems);
            groups.push(group);
        }
        const session = new ContextSession();
        session.init(groups, config);
        this.appendChild(session);
        this.sessions.push(session);
    }
    async hide(detachAllSession = false) {
        if (detachAllSession) {
            this.sessions.forEach((session) => {
                session.remove();
                session.config?.onHide && session.config?.onHide();
            });
            this.sessions = [];
        }
        else {
            const session = this.sessions.pop();
            if (!session) {
                return;
            }
            session.remove();
            session.config?.onHide && session.config?.onHide();
        }
    }
}
export { ContextContentContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dENvbnRlbnRDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb250ZXh0Q29udGVudENvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFFckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBK0IsTUFBTSxrQkFBa0IsQ0FBQTtBQUU5RSxNQUFNLHVCQUF3QixTQUFRLGFBQWE7SUFDakQsUUFBUSxHQUFxQixFQUFFLENBQUE7SUFFL0IsWUFBWSxLQUFrQjtRQUM1QixLQUFLLENBQUM7WUFDSixVQUFVLEVBQUUsYUFBYTtZQUN6QixRQUFRLEVBQUUsVUFBVTtZQUNwQixHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDO1lBQ1AsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1NBQ2pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQTJCLEVBQUUsTUFBc0I7UUFDNUQsTUFBTSxLQUFLLEdBQTJDLEVBQUUsQ0FBQTtRQUN4RCxLQUFLLE1BQU0sV0FBVyxJQUFJLFlBQVksRUFBRTtZQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDakMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7YUFDbEM7WUFDRCxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUMvQztRQUVELE1BQU0sTUFBTSxHQUFpQixFQUFFLENBQUE7UUFFL0IsS0FBSyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFBO1lBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUE7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNuQjtRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUE7UUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUV6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLO1FBQ2pDLElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO2dCQUNoQixPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFBO1lBQ3BELENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7U0FDbkI7YUFBTTtZQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixPQUFNO2FBQ1A7WUFDRCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDaEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQTtTQUNuRDtJQUNILENBQUM7Q0FDRjtBQUVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFBIn0=