# Questions/Answers

This is the list of questions/answers to part #2.

## Q1: What is the difference between Component and PureComponent? give an example where it might break my app.
- Answer:
  The PureComponent = Component + built-in shouldComponentUpdate with shallow comparison. It works so: when the props or state were changed the PureComponent does a shallow comparison of their values. Examples if using the PureComponent:
    - 1 === 1 // the component won't re-render, if the value is the same.
    - 'textBefore' === 'textAfter' // the component will re-render, if the value is a different.
    - { id: 1 } === { id: 2 } // the component will re-render, if an object has a new reference.
    - const obj = { id: 1 }; obj.id = 2; obj === obj // the component won't re-render, if an object has the same reference.
  Using the PureComponent is not always the advantage, for instance, if the component receives the children(node, array of nodes) it still will re-render, as the children are re-created after each subsequent update in its parent component, plus it also makes the component slower, as the comparison is executed.

## Q2: Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
- Answer:
  The "shouldComponentUpdate" ignores the context value changes, so the component will be re-rendered.


## Q3: Describe 3 ways to pass information from a component to its PARENT.
- Answer:
  - #1: Pass the callback prop to the child component, call the callback in child component by passing the information from it.
  - #2: Context API. Using the Context I can subscribe both the parent and child components to the same context, in case if the child updates the context value then the parent can read it.
  - #3: The Redux state manager. Given there is a redux store with its data, the subscribed child component can set the new value into the store and then the subscribed parent component can read it.

## Q4: Give 2 ways to prevent components from re-rendering.
- Answer:
  - #1: Using the PureComponent is already discovered in #1 point.
  - #2: Using UseMemo and UseCallback hooks. Both hooks are utilizing the memoization(caching + comparison), it means the component will re-render only, if the inputs passed to its function are different. The difference btw the hooks: the UseMemo cache the result of computation and the UseCallback cache the callback it accepts.

## Q5: What is a fragment and why do we need it? Give an example where it might break my app.
- Answer:
  With Fragment you can group the list of elements, so no need to wrap it with the new node(div, etc.). Probably to break the app we could pass the props which Fragment doesn't support.

## Q6: Give 3 examples of the HOC pattern.
- Answer:
  - Using the higher-order component. The function with the reusable logic that extends the Component it accepted as the prop.
  - Using the render prop. The component itself includes the reusable logic and then calls its prop "render()" to render the accepted Component.
  - Using React hooks. The hook function may include the reusable logic which then could be applied in a different components.

## Q7: What's the difference in handling exceptions in promises, callbacks and async...await?
- Answer:
  - In promises you could use the Promise.catch method to handle the error.
  - In callbacks you could handle the error in the callback itself.
  - In async...await you could try-catch the await call.

## Q8: How many arguments does setState take and why is it async?
- Answer:
  The setState accepts 1 argument which could be the new state object or the callback with its parameter referring to the latest state and then returning the new state. The setState is async because it allows React to manage a batch of setState  calls resulting into a single re-render, so it makes the component much faster.

## Q9: List the steps needed to migrate a Class to Function Component.?
- Answer:
  1. Replace the class declaration to the function.
  2. Initialize the state with "useState" hook instead of "this.state". Then replace "this.setState()" calls with "setSmth" which is the setter method from the "useState" call result.
  3. Declare the component methods as variables and remove "this" usage and access the variables directly.
  4. Replace the "render" method with just "return" which returns the UI.
  5. Replace the life-cycle methods with their similar implementation but for the functional components. Example, instead of "componentDidMount" you could apply "useEffect" with an empty dependency array.

## Q10: List a few ways styles can be used with components.
- Answer:
  Usually there 3 ways to set css: 1)inline, 2)via className prop and 3)using JS.
  In most cases I prefer to use the "className" option in combination with CSS modules + SASS, in this way the code is simpler, organized and reusable.
  Additionally I was using the other css tools like "styled-components", "styled-system", "bootstrap/material UI", and others. All of them has their pros & cons, and to pick the best is always depends on the project specifics.

## Q11: How to render an HTML string coming from the server.
- Answer:
  The React provides its own attribute which is the replacement of the "innerHTML". We need to pass this attribute to the element where its value is an object containing the HTML string. Note: I don't remember the attribute name.
