export class View {
    constructor(baseTitle: String);
    setTitle(titleMod?: String): void;
    renderHtml(): String;
}

declare type Route = {
    title: String;
    path: String;
    view: View;
    loadScript?: Function;
}

declare type RouterOptions = {
    loadScript: Function;
    topOfPage: {
        top: number;
        left: number;
        behavior: 'auto' | 'smooth';
    }
}

export class Router {
    constructor(
        root: HTMLElement,
        nav: HTMLElement,
        display: HTMLElement,
        routes: Route[],
        options?: RouterOptions
    );
    root: HTMLElement;
    nav: HTMLElement;
    display: HTMLElement;
    routes: Route[];
}
