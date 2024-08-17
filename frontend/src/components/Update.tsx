import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Item } from "./DataDisplay";

interface UpdateProps {
  isOpenFromParent: boolean;
  onCloseUpdate: () => void;
  item: Item;
}

const Update = ({ isOpenFromParent, onCloseUpdate, item }: UpdateProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setModalOpen(isOpenFromParent);
  }, [isOpenFromParent]);

  const closeModal = () => {
    setModalOpen(false);
    onCloseUpdate();
  };

  return (
    <div className="bg-red-500">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Update Item Details"
        buttonText="Update Item"
        item={item}
      />
    </div>
  );
};

export default Update;
