import React, { useState, useEffect } from 'react';
import Box from './Box';

const GameBoard = ({ blackBoxIndex, gameArray, setBoxes })=>{

    const [isTopEdge, setTopEdge] = useState(false);
    const [isLeftEdge, setLeftEdge] = useState(false);
    const [isRightEdge, setRightEdge] = useState(false);
    const [isBottomEdge, setBottomEdge] = useState(false);

    const [dragTop, setDragTop] = useState(0);
    const [dragRight, setDragRight] = useState(0);
    const [dragBottom, setDragBottom] = useState(0);
    const [dragLeft, setDragLeft] = useState(0);
    const [dragId, setDragId] = useState(null);

    const width = 5;
    let noEdges = !isBottomEdge && !isLeftEdge && !isRightEdge && !isTopEdge;
    useEffect(()=>{
        checkBlackBox()
    })

    useEffect(()=>{
            //skapa en hjälpfunktion som kollar blackboxindex, och lägger draggable true på
            //alla objekt som är +1 +width, -1, -width såvida inte isTopEdge osv är true

            const checkIsDraggable = ()=>{
                if(noEdges){
                    setDragBottom(gameArray[blackBoxIndex+width].id);
                    setDragRight(gameArray[blackBoxIndex+1].id);
                    setDragLeft(gameArray[blackBoxIndex-1].id);
                    setDragTop(gameArray[blackBoxIndex-width].id);
                }
                if(isTopEdge && isLeftEdge){
                    setDragRight(gameArray[blackBoxIndex+1].id);
                    setDragBottom(gameArray[blackBoxIndex+width].id);
                }
                if(isTopEdge && !isLeftEdge && !isRightEdge){
                    setDragBottom(gameArray[blackBoxIndex+width].id);
                    setDragRight(gameArray[blackBoxIndex+1].id);
                    setDragLeft(gameArray[blackBoxIndex-1].id);
                }
                if(isTopEdge && isRightEdge){
                    setDragBottom(gameArray[blackBoxIndex+width].id);
                    setDragLeft(gameArray[blackBoxIndex-1].id);
                }
                if(isRightEdge && !isTopEdge && !isBottomEdge){
                    setDragBottom(gameArray[blackBoxIndex+width].id);
                    setDragLeft(gameArray[blackBoxIndex-1].id);
                    setDragTop(gameArray[blackBoxIndex-width].id);
                }
                if(isBottomEdge && isRightEdge){
                    setDragLeft(gameArray[blackBoxIndex-1].id);
                    setDragTop(gameArray[blackBoxIndex-width].id);
                }
                if(isBottomEdge && !isRightEdge && !isLeftEdge){
                    setDragRight(gameArray[blackBoxIndex+1].id);
                    setDragLeft(gameArray[blackBoxIndex-1].id);
                    setDragTop(gameArray[blackBoxIndex-width].id);
                }
                if(isLeftEdge && isBottomEdge){
                    setDragRight(gameArray[blackBoxIndex+1].id);
                    setDragTop(gameArray[blackBoxIndex-width].id);
                }
                if(isLeftEdge && !isTopEdge && !isBottomEdge){
                    setDragBottom(gameArray[blackBoxIndex+width].id);
                    setDragRight(gameArray[blackBoxIndex+1].id);
                    setDragTop(gameArray[blackBoxIndex-width].id);
                }

            }

        // console.log('top? ',isTopEdge)
        // console.log('bottom? ',isBottomEdge)
        // console.log('right? ',isRightEdge)
        // console.log('left? ',isLeftEdge)
        checkIsDraggable();
    }, [noEdges, isBottomEdge, isTopEdge, isRightEdge, isLeftEdge])

    //kolla om den svarta lådan ligger i kanten:
    const checkBlackBox = ()=>{
        if(blackBoxIndex < width -1){
            setTopEdge(true);
        }
        if(blackBoxIndex > width*width - width -1){
            setBottomEdge(true);
        }
        if(blackBoxIndex === width -1 || blackBoxIndex === width*2-1 || blackBoxIndex === width*3-1 || blackBoxIndex === width*4-1){
            setRightEdge(true);
        }
        if(blackBoxIndex === 0 || blackBoxIndex === width || blackBoxIndex === width*2 || blackBoxIndex === width*3 || blackBoxIndex === width*4){
            setLeftEdge(true);
        }
    }

    

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
    const dragBox = gameArray.find(box => box.id === parseInt(dragId));
    const dropBox = gameArray.find(box => box.id === parseInt(e.target.id));

    console.log(`dragbox order: ${dragBox.order}`)
    console.log(`dropbox order: ${dropBox.order}`)

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;


    const newBoxState = gameArray.map((box) => {
        if (box.id === dragId) {
            box.order = dropBoxOrder;
        }
        if (box.id === e.target.id) {
            box.order = dragBoxOrder;
        }
    return box;
    });
    console.log(newBoxState)

    setBoxes(newBoxState);
}



    return(
        <div className="grid" id="grid">
            {gameArray.map((box)=>
            box.id === dragBottom || box.id === dragRight || box.id === dragLeft || box.id === dragTop?
            <Box key={box.id} gridOrder={box.order} colour={box.colour} boxes={gameArray} setBoxes={setBoxes} isDraggable={true} boxId={box.id} handleDrag={handleDrag}  />
            :
            <Box key={box.id} gridOrder={box.order} colour={box.colour} boxes={gameArray} setBoxes={setBoxes} isDraggable={false} boxId={box.id} handleDrop={handleDrop} handleDragEnter={handleDragEnter} />
            )}
        </div>
    )
}
export default GameBoard;