import { useState } from "react"
import Modal from 'react-modal';
import "./style.scss"

Modal.setAppElement('#root');

type ModalProps = {
    modalIsOpen: boolean,
    closeModal: () => void,
    handleEditTier: (id: number) => void,
    editIndex: number,
    value: string,
    handleChangeLabel: (label: string, index: number) => void,
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
const EditTierModal = ({ modalIsOpen, closeModal, handleEditTier, editIndex, value, handleChangeLabel }: ModalProps) => {

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
                    value={value}
                    onChange={(e) => handleChangeLabel(e.target.value, editIndex)}
                    className="border border-gray-500 rounded-lg w-full p-4"
                />
            </form>
            <br />
            <button className="px-8 py-1 bg-gray-200" onClick={() => handleEditTier(editIndex)}>Edit</button>
        </Modal >)
}

export default EditTierModal;