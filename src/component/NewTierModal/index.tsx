import { useState } from "react"
import Modal from 'react-modal';
import "./style.scss"

Modal.setAppElement('#root');

type NewTierModalProps = {
  modalIsOpen: boolean,
  closeModal: () => void,
  handleAddRow?: () => void,
  newLabel: string,
  handleChangeLabel: (label: string) => void,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "50vw"
  }
};
const NewTierModal = ({ modalIsOpen, closeModal, handleAddRow, newLabel, handleChangeLabel }: NewTierModalProps) => {

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
      overlayClassName="Overlay"
    >
      <div className="relative">
        <button onClick={closeModal} className="absolute top-0 right-0">x</button>
      </div>
      <form>
        <div className="text-center text-2xl mb-4">
          <p>Tier label:</p>
        </div>
        <textarea
          value={newLabel}
          onChange={(e) => handleChangeLabel(e.target.value)}
          className="border border-gray-500 rounded-lg w-full p-4"
        />
      </form>
      <br />
      <button className="px-8 py-1 bg-gray-200" onClick={handleAddRow}>Add</button>
    </Modal >)
}

export default NewTierModal;