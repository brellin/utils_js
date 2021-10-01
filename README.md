# Utils

## Router
The router class takes four arguments:
| Name | Type | Description |
| :--- | :--- | :---------- |
| root | `DOM Element` | The outermost element of where the routes will be rendered |
| nav | `DOM Element` | The element the links for the routes will be appended to |
| display | `DOM Element` | The element the routes will be displayed within |
| routes | Array of Objects | An array that outlines the routes - to include (optional) sub-routes |

## View
A very simple abstract class
An implementation of the abstract class - takes one argument, `title` (document title) - will allow you to inherit `baseTitle` using `super()` within the constructor of the extended classes.
The extended classes only require one method to be overwritten -> `renderHTML`, where you can create the HTML to be rendered per route.

