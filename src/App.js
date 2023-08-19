import React, { useEffect } from "react"; // Import 'useEffect' from React
import "./App.css";
import { connect, Provider } from 'react-redux'
import { createStore } from "redux"

const initial_state = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1
}
const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return { ...state, player: action.payload }
    case "SET_MARKS":
      return { ...state, marks: action.payload }
      case "SET_GAMEOVER":
        return { ...state, gameover: action.payload }
    default:
      return state;
  }
}

const store = createStore(reducer); // Pass the reducer to createStore

function App() {
  return (
    <div className="App">
      <h2>TIC_TAC_TOE Game</h2>
      <Provider store={store}>
        <BoardContainer /> {/* Use the connected component */}
      </Provider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  marks: state.marks,
  player: state.player,
  gameOver:state.gameOver
});

const mapDispatchToProps = (dispatch) => ({
  setMarks: (marks) => {
    dispatch({ type: "SET_MARKS", payload: marks })
  },
  setPlayer: (player) => {
    dispatch({ type: "SET_PLAYER", payload: player })
  },
  setGameOver: (status) => {
    dispatch({ type: "SET_GAMEOVER", payload: status })
  }
});

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

function Board({ marks, player,gameOver,setGameOver, setMarks, setPlayer }) {

  useEffect(() => {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let c of combinations) {
      if (marks[c[0]] === 1 && marks[c[1]] === 1 && marks[c[2]] === 1) {
       alert('player 1 winner')
        setGameOver(true)
      }
      if (marks[c[0]] === 2 && marks[c[1]] === 2 && marks[c[2]] === 2) {
       alert('player 2 winner')
        setGameOver(true);
      }
    }

  }, [marks])

  const changeMark = (index) => {

    const newState = [...marks];
    if (newState[index] === 0 && !gameOver) {
      newState[index] = player;
      setMarks(newState);
      setPlayer(player === 1 ? 2 : 1);
    } else {
      alert("please click on empty blocks");
    }

  };
  return (
    <div className="Board">
      <div>
        <Block mark={marks[0]} changeMark={changeMark} position={0}/>
        <Block mark={marks[1]}  changeMark={changeMark} position={1}/>
        <Block mark={marks[2]}  changeMark={changeMark} position={2}/>
      </div>
      <div>
        <Block mark={marks[3]} changeMark={changeMark} position={3}/>
        <Block mark={marks[4]}  changeMark={changeMark}position={4} />
        <Block mark={marks[5]}  changeMark={changeMark} position={5}/>
      </div>
      <div>
        <Block mark={marks[6]}  changeMark={changeMark} position={6}/>
        <Block mark={marks[7]}  changeMark={changeMark} position={7}/>
        <Block mark={marks[8]}  changeMark={changeMark} position={8}/>
      </div>
    </div>
  );
}



function Block({ mark, changeMark,position }) {
  return (
    <div
      className={`Block mark${mark}`} // Correct the className format
      onClick={e=>changeMark(position)} // Correct the 'onclick' to 'onClick'
    ></div>
  );
}

export default App;
