import React, { useState, useEffect } from 'react';
import Box from './Box';
import shuffle from '../functions/Shuffle.js';


const boxArray = [ {id: 1, colour:'blue'},
  {id: 2, colour:'blue'},
  {id: 3, colour:'blue'},
  {id: 4, colour:'blue'},
  {id: 5, colour:'pink'},
  {id: 6, colour:'pink'},
  {id: 7, colour:'pink'},
  {id: 8, colour:'pink'},
  {id: 9, colour:'green'},
  {id: 10, colour:'green'},
  {id: 11, colour:'green'},
  {id: 12, colour:'green'},
  {id: 13, colour:'gold'},
  {id: 14, colour:'gold'},
  {id: 15, colour:'gold'},
  {id: 16, colour:'gold'},
  {id: 17, colour:'white'},
  {id: 18, colour:'white'},
  {id: 19, colour:'white'},
  {id: 20, colour:'white'},
  {id: 21, colour:'purple'},
  {id: 22, colour:'purple'},
  {id: 23, colour:'purple'},
  {id: 24, colour:'purple'},
  {id: 25, colour:'black'},
];


const shuffledArray = shuffle(boxArray);

const orderedBoxes = shuffledArray.map((val, index) => ({...val, order : index}));


const GameBoard = ()=>{
    
    const [boxes, setBoxes] = useState(orderedBoxes);
    const [isTopEdge, setTopEdge] = useState(null);
    const [isLeftEdge, setLeftEdge] = useState(null);
    const [isRightEdge, setRightEdge] = useState(null);
    const [isBottomEdge, setBottomEdge] = useState(null);
    const [updateDrag, setUpdateDrag] = useState(true);
    const [dragTop, setDragTop] = useState(0);
    const [dragRight, setDragRight] = useState(0);
    const [dragBottom, setDragBottom] = useState(0);
    const [dragLeft, setDragLeft] = useState(0);
    const [dragId, setDragId] = useState(null);
    const [blackBoxIndex, setBlackBoxIndex] = useState(parseInt(orderedBoxes.find(box => box.id === 25).order));
    

    const width = 5;

    useEffect(()=> {
        //kolla om den svarta lådan ligger i kanten:
        
    const checkBlackBox = ()=>{

        if(blackBoxIndex < width){
            setTopEdge(true);
            console.log(`vi sätter top edge true`)
            setUpdateDrag(false)

        } else {
            setTopEdge(false) 
            setUpdateDrag(false)

        }
        if(blackBoxIndex >= width*4){
            setBottomEdge(true);
            setUpdateDrag(false)

        }else {
            setBottomEdge(false)
            setUpdateDrag(false)

        }
        if((blackBoxIndex === 4) || (blackBoxIndex === 9) || (blackBoxIndex === 14) || (blackBoxIndex === 19) || (blackBoxIndex === 24)){
            setRightEdge(true);
            setUpdateDrag(false)

        }else{setRightEdge(false)
            setUpdateDrag(false)

        }
        if((blackBoxIndex === 0) || (blackBoxIndex === width) || (blackBoxIndex === width*2) || (blackBoxIndex === width*3) || (blackBoxIndex === width*4)){
            setLeftEdge(true);
            setUpdateDrag(false)

        }else{
            setLeftEdge(false)
            setUpdateDrag(false)

        }
    }


        checkBlackBox()
        setUpdateDrag(true)

        
    }, [boxes, blackBoxIndex])


    useEffect(()=>{
            //skapa en hjälpfunktion som kollar blackboxindex, och lägger draggable true på

        const checkIsDraggable = ()=>{
            if (isBottomEdge !== null) {

                if(!isBottomEdge && !isLeftEdge && !isRightEdge && !isTopEdge){
                    setDragBottom(boxes[blackBoxIndex+width].id);
                    setDragRight(boxes[blackBoxIndex+1].id);
                    setDragLeft(boxes[blackBoxIndex-1].id);
                    setDragTop(boxes[blackBoxIndex-width].id);
                }
                if(isTopEdge && isLeftEdge){
                    setDragRight(boxes[blackBoxIndex+1].id);
                    setDragBottom(boxes[blackBoxIndex+width].id);
                }
                if(isTopEdge && !isLeftEdge && !isRightEdge){
                    setDragBottom(boxes[blackBoxIndex+width].id);
                    setDragRight(boxes[blackBoxIndex+1].id);
                    setDragLeft(boxes[blackBoxIndex-1].id);
                }
                if(isTopEdge && isRightEdge){
                    setDragBottom(boxes[blackBoxIndex+width].id);
                    setDragLeft(boxes[blackBoxIndex-1].id);
                }
                if(isRightEdge && !isTopEdge && !isBottomEdge){
                    setDragBottom(boxes[blackBoxIndex+width].id);
                    setDragLeft(boxes[blackBoxIndex-1].id);
                    setDragTop(boxes[blackBoxIndex-width].id);
                }
                if(isBottomEdge && isRightEdge){
                    setDragLeft(boxes[blackBoxIndex-1].id);
                    setDragTop(boxes[blackBoxIndex-width].id);
                }
                if(isBottomEdge && !isRightEdge && !isLeftEdge){
                    setDragRight(boxes[blackBoxIndex+1].id);
                    setDragLeft(boxes[blackBoxIndex-1].id);
                    setDragTop(boxes[blackBoxIndex-width].id);
                }
                if(isLeftEdge && isBottomEdge){
                    setDragRight(boxes[blackBoxIndex+1].id);
                    setDragTop(boxes[blackBoxIndex-width].id);
                }
                if(isLeftEdge && !isTopEdge && !isBottomEdge){
                    setDragBottom(boxes[blackBoxIndex+width].id);
                    setDragRight(boxes[blackBoxIndex+1].id);
                    setDragTop(boxes[blackBoxIndex-width].id);
                }
                setUpdateDrag(false)
            }
        }
        
        if (updateDrag) {

            checkIsDraggable();
        }
    })

    

  const handleDragEnter = e => {
    console.log('enterdrop: ', e.target.id)
    e.preventDefault();
  
  };

const handleDrag = e => {

    console.log('dragging: ' , e.target.id)
    setDragId(e.target.id);
}

const handleDrop = e => {
    console.log(`dragID: ${dragId}`)
    console.log(`e target: ${e.target.id}`)
    const dragBox = boxes.find(box => box.id === parseInt(dragId));
    const dropBox = boxes.find(box => box.id === parseInt(e.target.id));

    console.log(`dragbox order: ${dragBox.order}`)
    console.log(`dropbox order: ${dropBox.order}`)

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;


    const newBoxState = boxes.map((box) => {
        if (box.id === dragBox.id) {
            box.order = dropBoxOrder;
        }
        if (box.id === dropBox.id) {
            box.order = dragBoxOrder;
        }
    return box;
    });
    console.log(newBoxState)

    setBlackBoxIndex(newBoxState.sort((a, b) => a.order - b.order).find(box => box.id === 25).order)
    setBoxes(newBoxState.sort((a, b) => a.order - b.order));

}



    return(
        <div className="grid" id="grid">
            {boxes.map((box)=>
            box.id === dragBottom || box.id === dragRight || box.id === dragLeft || box.id === dragTop?
            <Box key={box.id} gridOrder={box.order} colour={box.colour} boxes={boxes} setBoxes={setBoxes} isDraggable={true} boxId={box.id} handleDrag={handleDrag}  />
            :
            <Box key={box.id} gridOrder={box.order} colour={box.colour} boxes={boxes} setBoxes={setBoxes} isDraggable={false} boxId={box.id} handleDrop={handleDrop} handleDragEnter={handleDragEnter} />
            )}
        </div>
    )
}
export default GameBoard;