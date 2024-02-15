class NullException extends Error {
    constructor(message) {
        super(message !== null && message !== void 0 ? message : 'Null object not accepted');
    }
}
export default NullException;
