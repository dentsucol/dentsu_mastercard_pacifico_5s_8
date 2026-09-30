import React, { useMemo } from "react"

const GTMContext = React.createContext()

export const GTMProvider = (props) => {
  const sendDataLayer = (json) => {
    window.dataLayer.push(json);
  }

  const value = useMemo(() => {
    return {
      sendDataLayer,
    };
  }, []);

  return <GTMContext.Provider value={value} {...props} />;
};

export const useGTM = () => {
  const context = React.useContext(GTMContext);

  if (!context) {
    throw new Error("useGTM debe estar dentro del proveedor GTMContext")
  }

  return context;
};
