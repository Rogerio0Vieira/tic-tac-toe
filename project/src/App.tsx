import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import {Container} from './components/container/Container'
import {Players} from './models/playerType'
import { Winner } from './components/winner/Winner'
import { Draw } from './components/draw/Draw'
import { PlayAgain } from './components/playagain/PlayAgain'
import { TurnOf } from './components/turnof/TurnOf'
import { Board } from './components/board/Board'


function App() {

  const [turn, setTurn] = useState<Players>() //Definindo os playres
  const [winner, setWinner] = useState<Players | null>(null) //O estado varia de playres (O ou X) para nulo
  const [draw, setDraw] = useState<boolean | null> (null) //Se o jogo acabou deu empate

  const [marks, setMarks] = useState<{[key: string]: Players}>({}); //Armazenar as posições como um objeto
  const gameOver = !!winner || !!draw
  const getSquares = () => {
    return new Array(9).fill(true);
  };

  const play = (index: number) =>{
    if(marks[index] || gameOver){
      return;
    }   
    setMarks(prev => ({...prev, [index]: turn})) //Atualizando o estado de marcação
    setTurn(prev => prev === "O" ? "X"  : "O") //Alternando os jogadores
  }

  const getCellPlayer = (index: number) =>{
    if (!marks[index]){
      return;
    }

    return marks[index];
  }

  const getWinner = () =>{
    const victoryLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    //Função usada para comparar as posições de varia
    for (const line of victoryLines){
      const [a,b,c] = line; 

      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]){
        return marks[a];
      }
    }
  };

  const reset = () =>{
    setMarks({});
    setWinner(null);
    setDraw(null);
  }

  useEffect(()=>{
    const winner = getWinner();

    if (winner){
      setWinner(winner);
    } else {
      if (Object.keys(marks).length === 9){
        setDraw(true);
      }
    }
  }, [marks])

  return (
    <Container>
      {winner && <Winner>"{winner}" Ganhou!</Winner>}
      {draw && <Draw>Empate!</Draw>}
      {gameOver && <PlayAgain props={reset}>Jogar novamente</PlayAgain>}
      {!gameOver && <TurnOf>{turn}</TurnOf>}

      <Board props={`board ${gameOver ? "gameOver" : null}`}>
      {getSquares().map((_, i) => (
          <div className={`cell ${getCellPlayer(i)}`} onClick={() => play(i)}>
            {marks[i]}
          </div>
        ))}
      </Board>
    </Container>
  )
}

export default App
