//Importamos las librerias.
import { useState } from 'react';
//creamos la funcion Squard.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
//Creamos la funcion Board.
function Board({ xIsNext, squares, onPlay }) {
  //Esta funcion nos permite llamar a la matriz de cuadros y actualizar
  //según los movimientos de cada jugador estos movimientos se registran cuando detecta un 'clic'.
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //En este segmento de código vemos los elementos que se mostrarán en la pantalla 
    //de acuerdo a los turnos y movimientos de los jugadores.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  //El siguiente segmento nos determina si le corresponde jugar al siguiente jugador 
  //o bien si ya se ha ganado.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  //Determinamos la estructura del juego en 3 filas y 3 columnas.
  return (
    <>
      <div className="status">{status}</div>
      //Creamos la primera fila con 3 elementos.
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      //Creamos la segunda fila con 3 elementos.
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      //Creamos la tercera fila con 3 elementos.
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//El siguiente segmento de código nos ayuda a mostrar en pantalla el historial de movimientos.
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  //En este segmento se detectan los movimientos que se mostrarán
  //en el historial.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //Retorna los movimientos de las celdas
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//Segmento de código que nos ayuda a determinar el ganador mediante
//combinaciones.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Con el siguiente ciclo podremos determinar los valores de los elementos
  //marcados en las casillas y de acuerdo a que si sean iguales 
  //determinar y mostrar al ganador.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
