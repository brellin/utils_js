# Utils

## Router
The router class takes four arguments:
| Name | Type | Description |
| :--: | :--: | :---------- |
| root | `DOM Element` | The outermost element of where the routes will be rendered |
| nav | `DOM Element` | The element the links for the routes will be appended to |
| display | `DOM Element` | The element the routes will be displayed within |
| routes | Array of Objects | An array that outlines the routes - to include (optional) sub-routes |
| options | Object | Currently only accepts `loadScript` and `topOfPage` to inject a script that you want to run when a route has loaded |

Routes object constructor schema:
```
{
    path: String,
    title: String,
    view: View Class,
    subRoutes: [{
        path: String,
        title: String,
        view: View Class
    }],
    display?: Boolean (defaults to true),
    loadScript?: Function
}
```

Options object schema:
```
{
    loadScript?: Function,
    topOfPage: {
        top: Number,
        left: Number,
        behavior: String (scroll behavior)
    }
}
```


There are multiple event listeners which are applied to your webpage as a result of this router.

Here is a list of event listeners that you can utilize:
| Trigger | Element | Affect |
| :-----: | :-----: | :----- |
| click | `a.internal` | Uses the class's `navigate` method to load the html provided within the view |

## View
A very simple abstract class
An implementation of the abstract class - takes one argument, `title` (document title) - will allow you to inherit `baseTitle` using `super()` within the constructor of the extended classes.

The extended classes only require one method to be overwritten -> `renderHTML`, where you can create the HTML to be rendered per route.

