class InvalidTagNameException extends Error {
    constructor(message) {
        super(message !== null && message !== void 0 ? message : 'Invalid tagName for custom element \n TagName cannot be empty or null');
    }
}
export default InvalidTagNameException;
