import DesignElementTypes from "../../common/DesignElementTypes";

interface IDesignElement {
    type: DesignElementTypes;
    isSelected: boolean;
    attachWrapper(): void;
    detachWrapper(): void;
    deselect(): void;
    deselectEvent(): void;
    selectEvent(): void;
}

export default IDesignElement