export class View {
    constructor(baseTitle: String);
    setTitle(titleMod?: String): void;
    renderHtml(): Promise<String>;
}
