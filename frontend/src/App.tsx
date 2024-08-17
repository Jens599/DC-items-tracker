import { useState } from "react";
import DataDisplay from "./components/DataDisplay";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "./components/Modal";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className="mt-10">
      {isModalOpen && <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Item Details"
        buttonText="Add Item"
      />}
      <div className="container m-auto justify-center">
        <div className="flex justify-between">
          <span className="text-5xl font-black underline underline-offset-4">
            DC Weapons:
          </span>
          <button
            className="flex items-center justify-center gap-1 rounded-full border px-4"
            onClick={openModal}
          >
            <CiCirclePlus size={30} />
            <span className="">add item</span>
          </button>
        </div>
        <DataDisplay />
      </div>
    </main>
  );
};

export default App;
