interface IExtensionId {
    new(id: string): this;
    hash(): void
}

export default IExtensionId