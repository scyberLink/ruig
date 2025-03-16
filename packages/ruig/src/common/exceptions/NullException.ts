class NullException extends Error {
  constructor(message?: string) {
    super(message ?? 'Null object not accepted')
  }
}

export { NullException }
