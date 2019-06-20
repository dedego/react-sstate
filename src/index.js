import React, { useState } from 'react';

const SstateContext = React.createContext({});
const { Provider, Consumer } = SstateContext;

const SstateConsumer = ({ children, path }) => {
    const [state, setStateProp] = useState();
    return <Consumer>
        {context => {
            const { getState, setState, subscribe } = context;
            const subscriptionId = Math.random().toString(36).substr(2, 9);
            subscribe(subscriptionId, path, (next, previous) => setStateProp({ next, previous }));
            return React.Children.map(children, child => {
                const childProps = {
                    getSstate: getState,
                    setSstate: (newval) => setState.call(context, path, newval),
                    sstate: state ? state : { next: getState(path), previous: undefined },
                };
                return React.cloneElement(child, childProps);
            });
        }}
    </Consumer>;
};

const SstateProvider = ({ store, children }) => <Provider value={store}>{children}</Provider>;

export {
    SstateProvider,
    SstateConsumer
};