
class InvalidTagNameException extends Error {
    constructor(message?: string) {
        super(message ?? "Invalid tagName for custom element \n TagName cannot be empty or null")
    }
}

export default InvalidTagNameException