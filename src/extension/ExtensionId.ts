import md5 from '../common/md5'
import IExtensionId from './IExtensionId'

class ExtensionId implements IExtensionId {
  private _id!: string

  public get id(): string {
    return this._id
  }

  public set id(value: string) {
    this._id = this.hash(value)
  }

  constructor(id: string) {
    this.id = id
  }

  hash(id: string): string {
    const hash = md5(id)

    return hash
  }
}

export default ExtensionId
