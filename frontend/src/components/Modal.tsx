import axios from "axios";
import { useEffect, useState } from "react";
import { useItemsContext } from "../hooks/useItemsContext";
import { Item } from "./DataDisplay";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  item?: Item;
}

interface Data {
  name: string;
  description: string;
  origin: string;
  owner: string;
  powers: string[];
}

const Modal = ({ isOpen, onClose, title, buttonText, item }: Props) => {
  const [data, setData] = useState<Data>({
    name: "",
    description: "",
    origin: "",
    owner: "",
    powers: [],
  });

  useEffect(() => {
    if (item) {
      const passedData = {
        name: item.name,
        description: item.description,
        origin: item.origin,
        owner: item.owner,
        powers: item.powers,
      };
      setData(passedData);
    }
  }, [item]);

  const { dispatch } = useItemsContext();

  if (!isOpen) return null;
  const handleAddItem = async () => {
    await axios
      .post("/it/addItem", data)
      .then((res) => {
        dispatch({ type: "ADD_ITEM", payload: res.data });
      })
      .then(() => {
        onClose();
      });
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "powers"
          ? value.split(",").map((item: string) => item.trim())
          : value,
    }));
  };

  const handleUpdateItem = async () => {
    if (!item) return;
    await axios
      .patch(`/it/updateItem/${item._id}`, data)
      .then((res) => {
        dispatch({ type: "UPDATE_ITEM", payload: res.data });
      })
      .then(() => {
        onClose();
      });
  };

  return (
    <div className="w-dvh absolute inset-0 flex h-dvh items-center justify-center">
      <div className="z-10 h-2/3 w-1/3 rounded-lg border border-zinc-700 bg-zinc-800">
        <form className="hid flex size-full flex-col items-center justify-center gap-8">
          <div className="flex w-2/3 flex-col items-start gap-4">
            <div className="w-full text-center text-xl font-black">{title}</div>

            <div className="flex w-full flex-col gap-1">
              Name:
              <input
                type="text"
                value={data.name}
                name="name"
                id=""
                className="h-8 rounded-md bg-zinc-600 px-2"
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              Description:
              <input
                type="text"
                value={data.description}
                name="description"
                id=""
                className="h-8 rounded-md bg-zinc-600 px-2"
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              Origin:
              <input
                type="text"
                value={data.origin}
                name="origin"
                id=""
                className="h-8 rounded-md bg-zinc-600 px-2"
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              Owner:
              <input
                type="text"
                value={data.owner}
                name="owner"
                id=""
                className="h-8 rounded-md bg-zinc-600 px-2"
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              Powers:
              <input
                type="text"
                value={data.powers.map((power) => `${power}`)}
                name="powers"
                id=""
                className="h-8 rounded-md bg-zinc-600 px-2"
                onChange={handleChange}
              />
            </div>
          </div>

          <input
            type="button"
            value={buttonText}
            className="w-2/3 rounded-full border border-gray-600 bg-gray-700 px-6 py-2 hover:border-gray-300 hover:bg-gray-600"
            onClick={title.split(" ")[0] === "Add" ? handleAddItem : handleUpdateItem}
          />
          <div className="rounded-md bg-red-800 px-12 py-2 text-center text-xs">
            Use Comma To Separate Values.
          </div>
        </form>
      </div>
      <div
        className="absolute inset-0 h-full w-full bg-zinc-700/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default Modal;
