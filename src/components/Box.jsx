import React from 'react';

const Box = ({colour, isDraggable, boxId, dispatch})=>{

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({type:'in-drop-zone'})
      };

    return(
        <>
        {isDraggable 
        ?   <div draggable className={colour} id={boxId}></div> 
        :   (boxId === 25) ? <div onDragEnter={handleDragEnter} className={colour} id={boxId}></div> : <div className={colour} id={boxId}></div>
        }
        </>
    )
}

export default Box;