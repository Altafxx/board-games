"use client"
import { useState } from 'react';

export default function Home() {
  const innerGrid = "aspect-square text-center border-b-2 border-r-2 hover:bg-gray-100 p-8 text-2xl"

  const [gameState, setGameState] = useState({
    gameBoard: Array.from({ length: 9 }).map(() => 2),
    currentPlayer: 0,
    player1: 0,
    player2: 0,
    player1Score: 0,
    player2Score: 0,
    gameOver: false,
    winner: 2,
  });

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const checkWinner = (board: any) => {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      console.log(gameState.player1, gameState.player2, gameState.currentPlayer,)
      if (board[a] === board[b] && board[a] === board[c] && board[a] !== 2) {
        console.log(`Player ${gameState.currentPlayer + 1} wins!`);
        setGameState({
          ...gameState,
          gameOver: true,
          player1Score: gameState.currentPlayer === 0 ? gameState.player1Score + 1 : gameState.player1Score,
          player2Score: gameState.currentPlayer === 1 ? gameState.player2Score + 1 : gameState.player2Score,
          winner: gameState.currentPlayer,
        });
        console.log(gameState)
      }
    }
  };

  const resetGame = () => {
    setGameState({
      gameBoard: Array.from({ length: 9 }).map(() => 2),
      currentPlayer: 0,
      player1: 0,
      player2: 0,
      player1Score: gameState.player1Score,
      player2Score: gameState.player2Score,
      gameOver: false,
      winner: 2,
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="grid grid-cols-3 border-t-2 border-l-2">
          {gameState.gameBoard.map((cell, i) => (
            <div key={i} className={innerGrid}
              onClick={() => {
                if (gameState.gameBoard[i] !== 2 || gameState.gameOver) return;

                const updatedBoard = [...gameState.gameBoard];
                updatedBoard[i] = gameState.currentPlayer;

                setGameState({
                  ...gameState,
                  gameBoard: updatedBoard,
                  currentPlayer: gameState.currentPlayer === 0 ? 1 : 0,
                  player1: updatedBoard.filter((cell) => cell === 0).length,
                  player2: updatedBoard.filter((cell) => cell === 1).length,
                });

                // Call checkWinner after state update
                checkWinner(updatedBoard);
              }}>
              {cell === 0 && <a>X</a>}
              {cell === 1 && <div>O</div>}
              {gameState.winner !== 2 && cell === 2 && <div>{gameState.currentPlayer == 0 ? "X" : "O"} </div>}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className={`flex items-center justify-start ${gameState.currentPlayer == 0 ? "text-blue-600" : ""}`}>Player 1</div>
          <div className="flex items-center justify-end">{gameState.player1Score}</div>
          <div className={`flex items-center justify-start ${gameState.currentPlayer == 1 ? "text-blue-600" : ""}`}>Player 2</div>
          <div className="flex items-center justify-end">{gameState.player2Score}</div>
        </div>
        <button onClick={resetGame} className="mt-4 p-2 bg-blue-600 text-white rounded-md">Reset Game</button>
      </div>
    </main>
  );
}
