import React from "react";

export interface ITierRow {
  id: number,
  title: string,
  pictures: {
    default: string;
  }[],
  openSettings: (id: number) => void,
  handleDeleteRow: (id: number) => void,
  handleChangeEditRow: (e: React.ChangeEvent<HTMLInputElement>, index: number,) => void,
  handleDragOver: (e) => void,
  handleDrop: (e, tierId: number,) => void,
}

const TierRow = ({
  id,
  title,
  pictures,
  openSettings,
  handleDeleteRow,
  handleChangeEditRow,
  handleDragOver,
  handleDrop
}: ITierRow) => {
  return (
    <div className="h-24 border border-gray-500 flex items-center"
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, id)}
    >
      <div className="h-full w-24 border-r border-gray-500 flex items-center justify-center">
        <input className="w-full text-center" value={title} onChange={(e) => handleChangeEditRow(e, id)} />
      </div>
      <div className="h-full flex flex-1 flex-row items-center items-center">
        {pictures && pictures.map((picture) =>
          <div className="h-full w-24 flex justify-center items-center">
            <img src={picture.default} className="w-11/12 h-11/12" />
          </div>
        )}
      </div>
      <div className="h-full border-l border-gray-500 flex items-center justify-center">
        <button onClick={() => openSettings(id)}>Settings</button>
        {"     "}
        <button onClick={() => handleDeleteRow(id)}>Delete</button>
      </div>
    </div >
  )
}

export default TierRow;