export default class {
    /**
     * Constructor for Router class
     * @param {HTMLElement} root HTML element to contain both navigation and routes
     * @param {HTMLElement} nav HTML element to contain the navigation, usually a nav tag
     * @param {HTMLElement} display HTML element to contain the area in which the routes will be displayed
     * @param {Array.<{path: string, title: string, view: object, subRoutes: Array.<{path: String, title: String, view: object}>}>} routes array of objects defining the routes as listed
     */
    constructor(root, nav, display, routes) {
        this.root = root;
        this.nav = nav;
        this.display = display;
        this.routes = routes;
        this.root.appendChild(this.nav);
        this.root.appendChild(this.display);
        window.addEventListener('popstate', this.populateRoute);
        this.addRoutesToNav();
        this.populateRoute();
    }

    /**
     * Adds each provided route as a link node to the navigation - with sub-route handling - and adds an event listener to use internal routing.
     * @param {string} className name of the class to be used for navigation links (defaults to "NavLink")
     * @param {string} subClassName name of the class to be used for sub-navigation links (defaults to "Sub")
     */
    addRoutesToNav = (className = 'NavLink', subClassName = 'Sub') => {
        this.routes.forEach(route => {

            const createLink = rt => {
                const el = document.createElement('a');
                el.innerText = rt.title;
                el.classList.add(className);
                el.href = rt.path;
                el.addEventListener('click', e => {
                    e.preventDefault();
                    this.navigate(e.target.href);
                });
                return el;
            };

            this.nav.appendChild(createLink(route));

            if (route.subRoutes) {
                const subMenu = document.createElement('div');
                route.subRoutes.forEach(sr => {
                    const subRoute = createLink(sr);
                    subRoute.classList.add(subClassName);
                    subMenu.appendChild(subRoute);
                });
                this.nav.appendChild(subMenu);
            }

        });
    };

    populateRoute = _ => {
        const possibleMatches = this.routes.map(route => ({ ...route, isMatch: location.pathname === route.path }));
        let match = possibleMatches.find(pm => pm.isMatch);

        if (!match) match = { ...this.routes[ 0 ], isMatch: true };

        const view = new match.view();

        this.handleActiveLink();
        this.display.innerHTML = view.getHtml();
    };

    navigate = url => {
        history.pushState(null, null, url);
        this.populateRoute();
    };

    handleActiveLink = _ => {
        this.nav.childNodes.forEach(link => {
            const routeMatch = this.routes.find(route => route.path === location.pathname);
            if (routeMatch) link.innerText === routeMatch.title ?
                link.classList.add('active') :
                link.classList.remove('active');
            else link.classList.remove('active');
        });
    };

}
