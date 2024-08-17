import { createContext, ReactNode, useReducer } from "react";
import { Item } from "../components/DataDisplay";

interface ItemsContextProviderProps {
  children: ReactNode;
}

export interface ItemsContextType {
  items: Item[];
  dispatch: React.Dispatch<Action>; 
}

type Action =
  | { type: "SET_ITEMS"; payload: Item[] }
  | { type: "REMOVE_ITEM"; payload: Item }
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "UPDATE_ITEM"; payload: Item };

export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined,
);

const itemsReducer = (state: Item[], action: Action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return action.payload;
    case "ADD_ITEM":
      return [action.payload, ...state];
    case "REMOVE_ITEM":
      return state.filter((i) => i._id !== action.payload._id);
    case "UPDATE_ITEM":
      return state.map((i) =>
        i._id === action.payload._id ? action.payload : i,
      );
    default:
      return state;
  }
};

export const ItemsContextProvider: React.FC<ItemsContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(itemsReducer, []);

  return (
    <ItemsContext.Provider value={{ items: state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
