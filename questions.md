1. What is the difference between Component and PureComponent? give an example where it might break my app. 
    1. The advantage and difference between Component and PureComponent is how the latter handles the ShouldComponentUpdate, it does it automatically for us. This difference ensures the component won’t re-render unless the props or state are actually different from ‘next’. How could this lead to the app breaking is by passing inline functions as props, such as <Component prop={() => functionName(renderItem.property)}, given this function will always be created on demand, ergo, it won’t have a preserved reference, it would cause the component to re-render by force.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that? 
3. Describe 3 ways to pass information from a component to its PARENT.
    1. Using a state management lib
    2. Using callbacks to communicate between child and parent component
    3. Using context
4. Give 2 ways to prevent components from re-rendering. 
    1. useMemo
    2. useCallback
    3. Either of these will prevent the component from re-rendering unless needed, if there is any update in their dependency array
5. What is a fragment and why do we need it? Give an example where it might break my app.
    1. It allows us to return multiple components/elements without having to wrap them in an additional and unneeded html element. It does not clutter te dom, this is why it’s helpful. It may break the stylings of an element if these are attempted to be added to the fragment, as fragment is only part of the shadow dom and not the actual rendered dom in the browser, these styles will be lost once the user views the rendered site
6. Give 3 examples of the HOC pattern. 
    1. Creating a component that receives a component, adds logic to it and then returns the received component with the added logic
    2. HOC composition, even after you’ve already used applied a HOC, you can apply another one to what the first HOC already received
    3. Using React hooks
7. what's the difference in handling exceptions in promises, callbacks and async...await. 
    1. Callbacks for instance cannot rely on handling errors inside try/catch blocks, as that code runs sync, but callbacks are usually meant for async operations. Additionally, there is “callback hell”, meaning, handling errors, or anything for that matter, in callbacks, is cumbersome. The standard way of handling errors is the error first approach, meaning, the first arg of the callback is usually “err”, one must check if err is present before executing any sort of calc on the response object of the cb.
    2. Promises do have a catch method, which makes error handling more “human readable”, however, albeit more readable than callbacks, there are still a bit difficult to follow when there are multiple promises chained one after the other, which is not convenient, specially when error handling. Additionally, if for a reason you need to make a call of an async operation inside the then block of a promise, even if there is a catch method call for that promise, the error won’t be handled, as the handling only catches sync instructions inside the then block
    3. This is the approach of my personal preference, async/await. It’s the most human readably syntax, you can use the classic try/catch block and generally speaking it reads like a sync instruction
8. How many arguments does setState take and why is it async. 
    1. It takes 2, the updated Key/value and a callback. The setState method is async due to performance reasons, the state may impact different components, so react has to evaluate that and then decided to update all of these in a single pass. setState can be forced to run sync but it may have an cost in performance.
9. List the steps needed to migrate a Class to Function Component. 
    1. Replace the class keyword with function
    2. Remove constructor
    3. Extract the return of the render method and remove the render method itself
    4. All methods (user defined) must be turned into functions
    5. Remove “this” references
    6. Replace class methods with hooks //eg setState vs useState, componentDidMount vs useEffect, etc
10. List a few ways styles can be used with components. 
    1. Inline styles
    2. Regular css
    3. Css in js

11. How to render an HTML string coming from the server. Haven’t had the chance to do SSR or SSG in react, have only experienced this in Vue, but generally speaking, you have 2 approaches, raw and with a lib. Usually the raw approach is for when you want to build a lib. Using an existing lib would mean having a lib that transforms the dom and styles into a string, so it can serve it over to the client via a network request. Differences between SSR and SSG is that one happens at compile time (SSG) and the other at the time of the request.
	// ReactDOMServer.renderToString(element)

