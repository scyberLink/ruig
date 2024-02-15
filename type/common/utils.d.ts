import BaseComponent from '../layers/view/application/components/base/BaseComponent';
import IAnyObject from './models/IAnyObject';
export declare function splitStringIntoChunks(str: string, chunkSize: number): string[];
export declare function getDefinedValuesFrom(object: {
    [key: string]: any;
}): {
    [key: string]: any;
};
export declare function escapeRegExp(value: string): string;
export declare function decodeQuery(query: string): any;
export declare function encodeQuery(query: {
    [key: string]: any;
}): string;
export declare function sumField(objArr: {
    [key: string]: any;
}[], ...field: string[]): number;
export declare function getObjectField(obj: {
    [key: string]: any;
}, fields: string[]): any;
export declare function getDayRegex(dateOrDateString?: string | Date): string;
export declare const shallowRemoveDuplicates: (arr: any[]) => any[];
export declare const getDaysDifference: (firstDate: Date | string, secondDate: Date | string) => number;
export declare const hasDatePassedSpecifiedDays: (targetDate: Date | string, days: number) => boolean;
export declare const getDateByAddedDaysToDate: (days: number, targetDate?: Date | string) => Date;
export declare const getRemainingDays: (previousDate: Date | string) => number;
export declare const getCutoffDateBySpecifiedDays: (days: number) => Date;
export declare const mongooseModelQueryObjectForPassDateByDays: (days: number, path: string) => {
    [x: string]: {
        $gte: Date;
    };
};
export declare const mongooseModelQueryObjectForExpirationDateFromToday: (path: string) => {
    [x: string]: {
        $lte: Date;
    };
};
export declare const mongooseModelQueryObjectForTodayDoc: (path: string) => {
    [x: string]: {
        $gte: Date;
        $lt: Date;
    };
};
export declare const didMonthStartedToday: () => boolean;
export declare const snakeCase: (camelCase: string) => string;
export declare const appendChildren: (parent: BaseComponent | null, ...children: HTMLElement[]) => BaseComponent;
export declare const removeLastChild: (parent: BaseComponent | null) => ChildNode;
export declare const cssString: (styleObject: IAnyObject) => string;
export declare const spreadTo: (parentObj: IAnyObject, objToSpread: IAnyObject) => IAnyObject;
export declare function createDragImage(element: HTMLElement): Promise<HTMLImageElement>;
export declare function elementToBlob(element: HTMLElement): Promise<Blob>;
