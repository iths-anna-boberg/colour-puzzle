import React, { useReducer} from 'react';
import shuffle from './functions/Shuffle';
import GameBoard from './components/GameBoard';

const boxArray = [
  {id: 1, colour:'blue'},
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
  {id: 25, colour:'black'}
];



const shuffledArray = shuffle(boxArray);

const boxes = shuffledArray.map((val, index) => ({...val, order: index}));

const reducer = (state, action) => {

  switch(action.type) {
    case 'in-drop-zone':
      console.log('is in drop zone');
    default:
      return state;
  }
}

function App() {

  const [boxesArr, dispatch] = useReducer(reducer, boxes)

  console.log(boxesArr)
  return (
    <div className="App">
      <h1>Colour puzzle</h1>
      {boxesArr ? <GameBoard boardArray={boxesArr} dispatch={dispatch}/> : null}
    </div>
  );
}

export default App;
