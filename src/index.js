import React, { useState, useEffect } from "react";

const { Provider, Consumer } = React.createContext({});

const SstateConsumer = ({ children, path }) => {
  const [state, setStateProp] = useState();
  let unsubscribe;
  useEffect(() => {
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);
  return (
    <Consumer>
      {context => {
        const { getState, setState, subscribe, exec } = context;
        unsubscribe = subscribe(path, (next, previous) =>
          setStateProp({ next, previous })
        );
        return React.Children.map(children, child => {
          const childProps = {
            getSstate: customPath =>
              getState.call(context, customPath ? customPath : path),
            setSstate: (customPath, newval) =>
              setState.call(
                context,
                customPath && newval ? customPath : path,
                newval ? newval : customPath
              ),
            execSstate: exec,  
            sstate: state
              ? state
              : { next: getState(path), previous: undefined }
          };
          return React.cloneElement(child, childProps);
        });
      }}
    </Consumer>
  );
};

const SstateProvider = ({ store, children }) => <Provider value={store}>{children}</Provider>;

export { SstateProvider, SstateConsumer };
