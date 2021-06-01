type ImagesAreaProp = {
  pictures: {
    default: string
  }[],
  handleDragStart: (e, index: number) => void,
}

const ImagesArea = ({ pictures, handleDragStart }: ImagesAreaProp) => {
  return <div className="flex flex-column">
    {pictures && pictures.map((image, index) => {
      return <div draggable onDragStart={(e) => handleDragStart(e, index)} className="w-24 h-24" >
        <img key={image.default} src={image.default} draggable={false} />
      </div>
    })}
  </div>
}

export default ImagesArea;