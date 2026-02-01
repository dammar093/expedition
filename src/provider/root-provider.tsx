"use client";

import { Provider } from "react-redux";
import { store } from "@/redux-store/store";

interface RootProviderProps {
  children: React.ReactNode;
}

const RootProvider = ({ children }: RootProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RootProvider;
