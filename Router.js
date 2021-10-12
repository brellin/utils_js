export default class {
    defaults = {
        options: {
            loadScript: () => { },
            topOfPage: {
                top: 0,
                left: 0,
                behavior: 'smooth'
            }
        }
    };
    /**
     * Constructor for Router class
     * @param {HTMLElement} root HTML element to contain both navigation and routes
     * @param {HTMLElement} nav HTML element to contain the navigation, usually a nav tag
     * @param {HTMLElement} display HTML element to contain the area in which the routes will be displayed
     * @param {Array.<{path: string, title: string, view: object, subRoutes: Array.<{path: String, title: String, view: object}>}>} routes array of objects defining the routes as listed
     */
    constructor(root, nav, display, routes, options) {
        this.root = root;
        this.nav = nav;
        this.display = display;
        this.routes = routes;
        this.root.appendChild(this.nav);
        this.root.appendChild(this.display);
        window.addEventListener('popstate', this.populateRoute);
        this.loadScript = options && options.loadScript ? options.loadScript : this.defaults.options.loadScript;
        this.topOfPage = options && options.topOfPage ? options.topOfPage : this.defaults.options.topOfPage;
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
                const link = document.createElement('a');
                link.innerText = rt.title;
                link.classList.add(className);
                link.href = rt.path;
                link.addEventListener('click', e => {
                    e.preventDefault();
                    this.navigate(e.target.href);
                });
                return link;
            };

            const routeElement = document.createElement('div');
            routeElement.appendChild(createLink(route));

            this.nav.appendChild(routeElement);

            if (route.subRoutes && route.subRoutes.some(r => r.display)) {
                const subMenu = document.createElement('div');
                subMenu.classList.add('SubMenu');
                routeElement.addEventListener('mouseenter', _ => subMenu.classList.add('hovered'));
                routeElement.addEventListener('mouseleave', _ => subMenu.classList.remove('hovered'));
                route.subRoutes.filter(sr => sr.display).forEach(sr => {
                    const subRoute = createLink(sr);
                    subRoute.classList.add(subClassName);
                    subMenu.appendChild(subRoute);
                });
                routeElement.appendChild(subMenu);
            }

        });
    };

    /**
     * Converts a path string to a regular expression
     * @param {string} path The path to be converted to regex
     * @returns A path that has been converted to regex
     */
    regExPath = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

    populateRoute = _ => {
        const possibleMatches = this.routes.map(route => ({
            ...route,
            isMatch: location.pathname.match(this.regExPath(route.path))
        }));
        const match = possibleMatches.find(pm => pm.isMatch) || { ...this.routes[ 0 ], isMatch: true };

        const view = new match.view();

        this.handleActiveLink();
        this.display.innerHTML = view.renderHtml();
        window.scrollTo(this.topOfPage);
        document.querySelectorAll('a.internal').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                this.navigate(e.target.href);
            });
        });
        this.loadScript();
    };

    navigate = url => {
        history.pushState(null, null, url);
        this.populateRoute();
    };

    handleActiveLink = _ => {
        this.nav.childNodes.forEach(link => {
            const routeSearch = [ ...this.routes, ...this.routes.filter(route => route.subRoutes).map(route => route.subRoutes).flat() ];
            const routeMatch = routeSearch.find(route => route.path === location.pathname);
            if (routeMatch) Array.from(link.childNodes).some(node => {
                return node.innerText === routeMatch.title;
            }) ?
                link.classList.add('active') :
                link.classList.remove('active');
            else link.classList.remove('active');
        });
    };

};
