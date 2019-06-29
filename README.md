# react-sstate

**react-sstate** is a small wrapper for the [Sstate](https://www.npmjs.com/package/sstate) library using React's context API. This library provides two
components: `<SstateProvider />` and `<SstateConsumer />`.

## Changelog

| Version | Changes                     |
| ------- | --------------------------- |
| 0.1.0   | Initial version of react-sstate |
| 0.2.0   | Improved setSstate and getSstate |
| 0.2.1   | Fixed the publishing of the component |
| 0.2.2   | Fixed an issue with providing the right path for getSstate |
| 0.2.3   | Fixed an issue with providing the right path for setSstate |
| 1.0.0   | Modified the SstateConsumer to unsubscribe on unmounting and removed the subscriptionId (based on the 1.0.0 version of Sstate) |

## Example

**App.js**
```javascript
import React, { Component } from 'react';
import { SstateProvider } from 'react-sstate';
import { Sstate } from 'sstate';

import FoodCart from './FoodCart';

const FoodStore = new Sstate({
    bread: { 
        baguette: 4, 
        wholeWeat: 3 
    }, 
    fruit: { 
        apples: 0.5, 
        bananas: 1 
    }
});

class App extends Component {
    render() {
        return <SstateProvider store={FoodStore}>
            <FoodCart />
        </SstateProvider>
    }
}
```

**FoodCart.js**
```javascript
import React, { Component } from 'react';
import { SstateConsumer } from 'react-sstate';

class FoodCart extends Component {
    addApple() {
        const { getSstate, setSstate } = this.props;

        // By providing only a single argument, the value is set onto the provided 
        // path by the wrapped SstateConsumer
        setState( getSstate() + 1 ); 
    }
    render() {
        const { sstate, setSstate, getSstate } = this.props;
        
        // You can access other state properties by specifying the path.
        const baguetteCount = getSstate('bread.baguette');

        // You can set other state properties as well, but the component
        // is not re-rendered as these properties are not watched.
        setSstate('bread.baguette', 5);

        return (
            <>
                <p>Apple count: {sstate.next} (was {sstate.previous} before)</p>
                <button onClick={this.addApple.bind(this)}>Add apple</button>

                <p>Baguette count: {baguetteCount}</p>
            </>
        );
    }

}

export default const WrappedFoodCart = () => {
    return <SstateConsumer path={'fruit.bananas'}><FoodCart /></SstateConsumer>;
}
```

## Props provided by `<SstateConsumer />` to its children

### **sstate**

This is the initial/current state of the property that was provided by passing the **path** on the `<SstateConsumer />`.

### **getSstate**

This is a method to get the latest state of the watched property, or other properties on the Sstate store.

```javascript
// Retrieves the watched property provided by the passed path on the SstateConsumer
getSstate() 

// With a given path, you can access all other properties on the Sstate store.
getSstate( path ) 
```

### **setSstate**

This is a method for modifying the watched property, or other properties on the Sstate store.

```javascript
// Updates the watched value
setSstate( newValue ) 

// With path as the first property, you can also modify other properties
setSstate( path, newValue ) 
```

