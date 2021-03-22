import React from 'react';

const Box = ({colour, isDraggable, gridOrder, boxId, handleDragEnter, handleDrag, handleDrop})=>{

    return(
        <>
        {isDraggable 
        ?   <div draggable onDrag={handleDrag} order={gridOrder} className={`box ${colour}`} id={boxId}></div> 
        :   (boxId === 25) ? <div onDragOver={handleDragEnter} onDrop={handleDrop} className={`box ${colour}`} order={gridOrder} id={boxId}></div> : <div className={`box ${colour}`} order={gridOrder} id={boxId}></div>
        }
        </>
    )
}

export default Box;