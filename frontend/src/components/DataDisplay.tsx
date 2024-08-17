import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { useItemsContext } from "../hooks/useItemsContext";
import Update from "./Update";

export interface Item {
  _id: string;
  name: string;
  description: string;
  origin: string;
  owner: string;
  powers: string[];
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

const DataDisplay = () => {
  const { items, dispatch } = useItemsContext();

  const [error, setError] = useState<string | null>(null);

  const [updateItem, setUpdateItem] = useState<Item>({
    _id: "",
    name: "",
    description: "",
    origin: "",
    owner: "",
    powers: [],
    createdAt: "",
    updatedAt: "",
  });

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleUpdate = (item: Item) => {
    setUpdateItem(item);
    return setModalOpen(true);
  };
  const onCloseUpdate = () => setModalOpen(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get("/it/getItems");

        dispatch({ type: "SET_ITEMS", payload: response.data });
      } catch (err) {
        setError("Failed to fetch items");
      }
    };

    getItems();
  }, []);

  const handleDelete = async (item: Item) => {
    await axios.delete(`/it/removeItem/${item._id}`).then((res) => {
      dispatch({ type: "REMOVE_ITEM", payload: res.data });
    });
  };

  return (
    <>
      {error ? (
        <div className="mt-6 text-2xl text-red-500 underline">{error}</div>
      ) : (
        // prettier-ignore
        <>
        
        {isModalOpen && <Update isOpenFromParent={isModalOpen} onCloseUpdate={onCloseUpdate} item={updateItem}/>}
        
        <div className="mt-10 grid grid-cols-11">
          <div className="flex items-center justify-center border px-5 py-4 text-orange-300 underline col-span-1"><span className="font-black uppercase">Name</span></div>
          <div className="flex items-center justify-center border px-5 py-4 text-orange-300 underline col-span-2"><span className="font-black uppercase">Description</span></div>
          <div className="flex items-center justify-center border px-5 py-4 text-orange-300 underline col-span-2"><span className="font-black uppercase">Origin</span></div>
          <div className="flex items-center justify-center border px-5 py-4 text-orange-300 underline col-span-2"><span className="font-black uppercase">Owner</span></div>
          <div className="flex items-center justify-center border px-5 py-4 text-orange-300 underline col-span-2"><span className="font-black uppercase">Powers</span></div>
          <div className="flex items-center justify-center border px-5 py-4 text-orange-300 underline col-span-1"><span className="font-black uppercase">Created</span></div>
          <div className="flex items-center justify-center border px-5 py-4 text-orange-300 underline col-span-1"><span className="font-black uppercase"></span></div>
          
          {items.map((item) => (
            <React.Fragment key={item._id}>
              <div className="flex items-center justify-center border px-5 py-4 text-center text-gray-400 col-span-1"><span className="">{item.name}</span></div>
              <div className="flex items-center justify-center border px-5 py-4 text-center text-gray-400 col-span-2"><span className="">{item.description}</span></div>
              <div className="flex items-center justify-center border px-5 py-4 text-center text-gray-400 col-span-2"><span className="">{item.origin}</span></div>
              <div className="flex items-center justify-center border px-5 py-4 text-center text-gray-400 col-span-2"><span className="">{item.owner}</span></div>
              <div className="flex items-center justify-center border px-5 py-4 text-center text-gray-400 col-span-2"><span className="">{item.powers.map((power, i) =>i < item.powers.length - 1 ? `${power}, ` : `${power}`,)}</span></div>
              <div className="flex items-center justify-center border px-5 py-4 text-center text-gray-400 col-span-1"><span className="">{formatDistanceToNow(item.createdAt)}</span></div>
              <div className="flex items-center justify-center border px-5 py-4 text-center text-gray-400 col-span-1">
                <div className="flex gap-2">
                  <BsFillTrash3Fill className="hover:fill-red-500" onClick={() => { handleDelete(item) }}/>
                  <GrUpdate className="hover:stroke-green-500" onClick={() => { handleUpdate(item) }}/>
                </div>
            </div>
            </React.Fragment>
          ))}
        </div>
       </>
      )}
    </>
  );
};

export default DataDisplay;
