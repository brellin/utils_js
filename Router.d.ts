declare type Route = {
    title: String;
    path: String;
    view: import('./View').View;
    subRoutes?: Route[];
    display?: Boolean;
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
