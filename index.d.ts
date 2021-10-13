export class View {
    constructor(baseTitle: string);
    setTitle(titleMod?: string): void;
    renderHtml(): string;
}

declare type Route = {
    title: string;
    path: string;
    view: View;
}

declare type RouterOptions = {
    loadScript: function;
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
