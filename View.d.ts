declare type Route = {
    path: String;
    title: String;
    loadScript?: Function;
    subRoutes?: Route[];
    display?: String;
}

export class View {
    constructor(baseTitle: String);
    setTitle(titleMod?: String): void;
    renderHtml(): Promise<String>;
    baseTitle: String;
    route: Route;
}
