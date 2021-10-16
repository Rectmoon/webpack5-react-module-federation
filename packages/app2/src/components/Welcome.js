import React from "lib-app/react";
import { NameContextProvider } from "lib-app/contexts";

const Welcome = () => {
  const name = React.useContext(NameContextProvider);

  return <p>Welcome, {name}</p>;
};

export default Welcome;