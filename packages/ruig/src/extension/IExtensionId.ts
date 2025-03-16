interface IExtensionId {
  id: string
  hash(id: string): string
}

export { IExtensionId }
