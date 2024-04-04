import './App.css'
import Rules from './Rules'
import logo from './assets/logo.svg'
import triangle from './assets/bg-triangle.svg'
import paper from './assets/icon-paper.svg'
import scissors from './assets/icon-scissors.svg'
import rock from './assets/icon-rock.svg'
import { useEffect, useState } from 'react'

function App() {
  const [score, setScore] = useState(0)
  const [playerChoice, setPlayerChoice] = useState('')
  const [houseChoice, setHouseChoice] = useState('')
  const [result, setResult] = useState('WON');
  const [isRulesOpen, setIsRulesOpen] = useState(false)

  useEffect(() => {
    console.log("Player choice:", playerChoice);
    console.log("House choice:", houseChoice);
    rules(playerChoice, houseChoice)
  }, [houseChoice]);

  function play(choice: string) {
    setPlayerChoice(choice)
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 3)
      randomNum == 0 ? setHouseChoice('paper') :
        randomNum == 1 ? setHouseChoice('scissors') :
          setHouseChoice('rock')
    }, 3000);
  }

  function rules(playerChoice: string, houseChoice: string) {
    let scoreChange = 0;
    if (
      (playerChoice === 'paper' && houseChoice === 'scissors') ||
      (playerChoice === 'scissors' && houseChoice === 'rock') ||
      (playerChoice === 'rock' && houseChoice === 'paper')
    ) {
      scoreChange = -1;
      setResult('LOST')
    } else if (
      (playerChoice === 'paper' && houseChoice === 'rock') ||
      (playerChoice === 'scissors' && houseChoice === 'paper') ||
      (playerChoice === 'rock' && houseChoice === 'scissors')
    ) {
      scoreChange = 1;
      setResult('WON')
    } else {
      setResult('DRAW')
    }
    setScore(curr => curr + scoreChange);

  }

  function playAgain() {
    setPlayerChoice('')
    setHouseChoice('')
  }


  return (
    <div className='App'>
      {
        isRulesOpen ? (<Rules closeRules={() => setIsRulesOpen(false)}/>) : null
      }
      <header>
        <img src={logo} alt="LOGO" width="30%" />
        <div className="scoreBox">
          <h2>SCORE</h2>
          <h1 className='score'>{score}</h1>
        </div>
      </header>
      {
        playerChoice == '' ?
          (
            <div className="gameBox">
              <img src={triangle} alt="TRIANGLE" className='triangle' />
              <div className="paperBox RPSBox" onClick={() => play('paper')}>
                <div className="paperBg RPSBg">
                  <img src={paper} alt="PAPER" />
                </div>
              </div>

              <div className="scissorsBox RPSBox" onClick={() => play('scissors')}>
                <div className="scissorsBg RPSBg">
                  <img src={scissors} alt="SCISSORS" />
                </div>
              </div>

              <div className="rockBox RPSBox" onClick={() => play('rock')}>
                <div className="rockBg RPSBg">
                  <img src={rock} alt="ROCK" />
                </div>
              </div>

            </div>
          ) :
          (
            <div className="gameResult">
              <div className="choicesWrapper">
                <div className="playerChoice">
                  <div className={playerChoice == 'paper' ? 'paperBox resultBox RPSBox' :
                    playerChoice == 'scissors' ? 'scissorsBox resultBox RPSBox' :
                      'rockBox resultBox RPSBox'}>
                    <div className="paperBg RPSBg">
                      <img src={playerChoice == 'paper' ? paper :
                        playerChoice == 'scissors' ? scissors :
                          rock} alt="PAPER" />
                    </div>
                  </div>
                  YOU PICKED
                </div>
                <div className="houseChoice">
                  {
                    houseChoice == '' ? (<div className="emptySlot"></div>) :
                      (
                        <div className={houseChoice == 'paper' ? 'paperBox resultBox RPSBox' :
                          houseChoice == 'scissors' ? 'scissorsBox resultBox RPSBox' :
                            'rockBox resultBox RPSBox'}>
                          <div className="paperBg RPSBg">
                            <img src={houseChoice == 'paper' ? paper :
                              houseChoice == 'scissors' ? scissors :
                                rock} alt="PAPER" />
                          </div>
                        </div>
                      )
                  }

                  THE HOUSE PICKED
                </div>
              </div>
              {
                houseChoice !== '' ?
                  (
                    <div className="showResult">
                      <div className="resultText">{result == 'WON' ? 'YOU WON' : result == 'LOST' ? 'YOU LOST' : 'DRAW'}</div>
                      <button className="playAgain" onClick={playAgain}>PLAY AGAIN</button>
                    </div>
                  ) : null
              }
            </div>
          )
      }

      <button className='rulesButton' onClick={() => setIsRulesOpen(true)}>RULES</button>
    </div>
  )
}

export default App
