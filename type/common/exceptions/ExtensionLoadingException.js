class ExtensionLoadingException extends Error {
    constructor(message) {
        super(message !== null && message !== void 0 ? message : 'An error occured while loading extension');
    }
}
export default ExtensionLoadingException;
