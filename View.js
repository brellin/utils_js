export default class {
    constructor(baseTitle) {
        this.baseTitle = baseTitle;
    }

    setTitle(titleModification) {
        document.title = `${ this.baseTitle }${ titleModification ? ` - ${ titleModification }` : '' }`;
    }

    renderHTML() {
        return "";
    }

}