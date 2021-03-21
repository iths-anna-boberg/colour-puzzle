import React, { useState, useEffect } from 'react';
import Box from './Box';

const GameBoard = ({ boardArray, dispatch })=>{

    const [gameArray, setGameArray] = useState(boardArray);
    const [blackBoxIndex, setBlackBoxIndex] = useState(boardArray.findIndex(box => box.id === 25));
    const [isTopEdge, setTopEdge] = useState(false);
    const [isLeftEdge, setLeftEdge] = useState(false);
    const [isRightEdge, setRightEdge] = useState(false);
    const [isBottomEdge, setBottomEdge] = useState(false);

    const [dragTop, setDragTop] = useState(0);
    const [dragRight, setDragRight] = useState(0);
    const [dragBottom, setDragBottom] = useState(0);
    const [dragLeft, setDragLeft] = useState(0);
    // const [isDraggable, setIsDraggable] = useState(false);
    const width = 5;
    let noEdges = !isBottomEdge && !isLeftEdge && !isRightEdge && !isTopEdge;
    console.log(gameArray)
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

        console.log('top? ',isTopEdge)
        console.log('bottom? ',isBottomEdge)
        console.log('right? ',isRightEdge)
        console.log('left? ',isLeftEdge)
        checkIsDraggable();
    }, [noEdges, isBottomEdge, isTopEdge, isRightEdge, isLeftEdge])

    console.log(blackBoxIndex)

    // const dragClass = noEdges? 'draggable' : '';


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

    return(
        <div className="grid" id="grid">
            {gameArray.map((box)=>
            box.id === dragBottom || box.id === dragRight || box.id === dragLeft || box.id === dragTop?
            <Box key={box.id} colour={box.colour} dispatch={dispatch} isDraggable={true} boxId={box.id} />
            :
            <Box key={box.id} colour={box.colour} dispatch={dispatch} isDraggable={false} boxId={box.id} />
            )}
        </div>
    )
}
export default GameBoard;