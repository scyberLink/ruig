import md5 from '../common/md5';
class ExtensionId {
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = this.hash(value);
    }
    constructor(id) {
        this.id = id;
    }
    hash(id) {
        const hash = md5(id);
        return hash;
    }
}
export default ExtensionId;
