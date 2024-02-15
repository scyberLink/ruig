class ExtensionLoadingException extends Error {
  constructor(message?: string) {
    super(message ?? 'An error occured while loading extension')
  }
}

export default ExtensionLoadingException
