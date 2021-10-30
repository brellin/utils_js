export default class {
    /**
     * Constructor for abstract view class
     * @param {String} baseTitle Title of the SPA
     */
    constructor(baseTitle) {
        this.baseTitle = baseTitle;
    }

    /**
     * Text will be appended after a hyphen
     * @param {String} titleMod Modification to the SPA title
     */
    setTitle(titleMod) {
        document.title = `${ this.baseTitle }${ titleMod ? ` - ${ titleMod }` : '' }`;
    }

    async renderHTML() {
        return "";
    }

}