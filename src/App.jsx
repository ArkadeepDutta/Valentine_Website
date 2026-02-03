import { useState } from 'react'
import confetti from 'canvas-confetti'
import bearGif from './assets/valentineBear.gif'
import kissGif from './assets/KissingBears.gif'
import pookie from './assets/pookieRose.png'
import './App.css'

function App() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState(null)

  const phrases = [
    "No", "Are you sure?", "Really sure?", "Think again!",
    "Last chance!", "Surely not?", "You might regret this!",
    "Give it another thought!", "Are you absolutely sure?",
    "This could be a mistake!", "Have a heart!", "Don't be so cold!",
    "Change of mind?", "Is that your final answer?", "You're breaking my heart ;("
  ]

  const handleNoClick = () => {
    const btnWidth = 150; // Estimated max width
    const btnHeight = 50;  // Estimated max height

    // Padding ensures it stays away from the very edge (address bars/taskbars)
    const padding = 20;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Use Math.max to ensure we don't get negative numbers on tiny screens
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    setNoButtonPos({ left: randomX, top: randomY });
    setNoCount(noCount + 1);
  }

  const handleYesClick = () => {
    setYesPressed(true)
    const heart = confetti.shapeFromPath({ path: 'M167 10L158 1c-12-11-32-11-45 0L100 14 87 1C75-10 55-10 42 1L33 10C15 28 15 57 33 75l67 67 67-67c18-18 18-47 0-65z' });
    confetti({
      shapes: [heart],
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff0000']
    });
  }

  const getNoButtonText = () => phrases[Math.min(noCount, phrases.length - 1)]
  const yesButtonSize = noCount * 20 + 16

  return (
    <div className="valentine-container">
      {yesPressed ? (
        <div className="success-screen">
          <div className='gif-wrapper2'>
            <img src={kissGif} alt="Chumma" />
          </div>

          <div className='poem-container'>
            <p className="poem-line">Chander moto hashi tomar, chokhe tarar alo,</p>
            <p className="poem-line">Tomar moner rajproshade ektu jayega pele bhalo.</p>
            <p className="poem-line">Tomar rupe matal hawa, mon je disha haray,</p>
            <p className="poem-line">Dekhe tomay surjomukhi-o chokh ferate doray.</p>
          </div>

          <div className='gif-wrapper2'>
            <img src={pookie} alt="Pookie With Rose" />
          </div>

        </div>
      ) : (
        <>
          <h1 className="question-text2">Chandrima</h1>
          <h1 className="question-text">Will you be my Valentine?</h1>

          <div className="card-container">
            <div className="gif-wrapper">
              <img src={bearGif} alt="Bear" className="bear-gif" />
            </div>

            <div className="button-group">
              <button
                className="yes-button"
                style={{ fontSize: `${yesButtonSize}px` }}
                onClick={handleYesClick}
              >
                Yes
              </button>

              {/* If position is NOT set yet, show it here. Once clicked, it goes global */}
              {!noButtonPos && (
                <button onClick={handleNoClick} className="no-button">
                  {getNoButtonText()}
                </button>
              )}
            </div>
          </div>

          {/* This button stays OUTSIDE the card so it can jump anywhere on screen */}
          {noButtonPos && (
            <button
              onClick={handleNoClick}
              className="no-button"
              style={{
                position: 'fixed',
                left: `${noButtonPos.left}px`,
                top: `${noButtonPos.top}px`,
                zIndex: 10000
              }}
            >
              {getNoButtonText()}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default App