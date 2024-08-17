import { ItemsContext } from "../context/ItemsContext";
import { useContext } from "react";

export const useItemsContext = () => {
  const context = useContext(ItemsContext);

  if (context === undefined) {
    throw new Error(
      "useItemsContext must be used within an ItemsContextProvider",
    );
  }

  return context;
};
