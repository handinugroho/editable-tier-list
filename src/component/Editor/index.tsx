import React, { useState } from "react"
import NewTierModal from "../NewTierModal"
import EditTierModal from "../EditTierModal"

import TierRow from "../TierRow"
import ImagesArea from "../ImagesArea";

function importAllImages(r) {
  return r.keys().map(r);
}

interface IPictures {
  default: string
}

const Editor = () => {
  const [modalIsOpen, setModalOpen] = useState({
    "new": false,
    "edit": false
  });
  const [newTierLabel, setNewTierLabel] = useState("New");
  const [modalEditIsOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0)
  const [editLabel, setEditLabel] = useState("")
  const [pictures, setPictures] = useState<IPictures[]>(() => {
    const initialState = importAllImages(require.context('../../assets', false, /\.(png|jpe?g|svg)$/));
    return initialState;
  })
  const [tierData, setTierData] = useState([
    {
      title: "S",
      pictures: []
    },
    {
      title: "A",
      pictures: []
    },
    {
      title: "B",
      pictures: []
    },
    {
      title: "C",
      pictures: []
    },
    {
      title: "D",
      pictures: []
    },
    {
      title: "E",
      pictures: []
    }
  ])



  function handleAddRow() {
    setTierData(prev => {
      return [
        ...prev,
        {
          title: newTierLabel,
          pictures: []
        }
      ]
    })
    closeModal("new");
  }

  function handleDeleteRow(id: number) {
    setTierData((prev) => prev.filter((_, index) => index !== id))
  }

  function openModal(menu: string, index?: number) {
    if (menu === "new") {
      setModalOpen(prev => {
        return {
          ...prev,
          "new": true
        }
      });
    } else {
      setModalOpen(prev => {
        return {
          ...prev,
          "edit": true
        }
      });
      if (index !== undefined) {
        setEditLabel(tierData[index].title)
        setEditIndex(index)
      }
    }
  }

  function closeModal(menu: string) {
    if (menu === "new") {
      setModalOpen(prev => {
        return {
          ...prev,
          "new": false
        }
      });
    } else {
      setModalOpen(prev => {
        return {
          ...prev,
          "edit": false
        }
      });
    }
  }

  function handleChangeNewLabel(label: string) {
    setNewTierLabel(label);
  }

  function handleChangeEditLabel(label: string, index: number) {
    setEditLabel(label)
  }

  function handleEditRow(index: number) {
    const tempTierData = tierData;
    tempTierData[index].title = editLabel;
    setTierData(tempTierData);
    closeModal("settings")
  }

  function handleChangeEditRow(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const tempTierData = tierData;
    tempTierData[index].title = e.target.value;
    setTierData([...tempTierData]);
  }

  function handleDragStart(e, index: number) {
    e.dataTransfer.setData("imageId", index);
  }


  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrop(e, tierId: number) {
    const imageId = Number(e.dataTransfer.getData("imageId"))
    const tempTierData = tierData;
    tempTierData[tierId].pictures.push(pictures[imageId])
    setTierData([...tempTierData])

    setPictures((prev) => prev.filter((_, index) => index != imageId))
  }

  return (
    <div>
      <NewTierModal
        modalIsOpen={modalIsOpen["new"]}
        closeModal={() => closeModal("new")}
        handleAddRow={handleAddRow}
        newLabel={newTierLabel}
        handleChangeLabel={handleChangeNewLabel}
      />

      <EditTierModal
        modalIsOpen={modalIsOpen["edit"]}
        closeModal={() => closeModal("edit")}
        handleEditTier={handleEditRow}
        editIndex={editIndex}
        value={editLabel}
        handleChangeLabel={handleChangeEditLabel}
      />
      {tierData.map((row, index) =>
        <TierRow
          key={index}
          id={index}
          title={row.title}
          pictures={row.pictures}
          openSettings={(editIndex: number) => openModal("settings", editIndex)}
          handleChangeEditRow={handleChangeEditRow}
          handleDeleteRow={handleDeleteRow}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      )}

      <br />
      <div>
        <button type="button"
          className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 
            hover:bg-green-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => openModal("new")}
        >
          Add row
      </button>
      </div>

      <br />
      <ImagesArea pictures={pictures} handleDragStart={handleDragStart} />

    </div >);
}

export default Editor;