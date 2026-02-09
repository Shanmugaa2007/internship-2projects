import { useState } from 'react';
import './ValentineProposal.css';
import confetti from 'canvas-confetti';

const ValentineProposal = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '60%', left: '60%' });
  const [hoverCount, setHoverCount] = useState(0);

  const pleas = [
    "No?","Are you sure?","Really sure?","Think again!","Last chance!",
    "Surely not?","You might regret this!","Give it another thought!",
    "Are you absolutely certain?","This could be a mistake!",
    "Have a heart!","Don't be so cold!","Change of heart?",
    "Wouldn't you reconsider?","Is that your final answer?",
    "You're breaking my heart"
  ];

  const handleNoHover = () => {
    const buttonWidth = 120;
    const buttonHeight = 60;

    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    setNoButtonPosition({ top: `${y}px`, left: `${x}px` });
    setHoverCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setAccepted(true);

    const duration = 10 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.6 } });
    }, 250);
  };

  if (accepted) {
    return (
      <div className='container'>
        <div className='card'>
          <h1 className='heading'>Yay!!! 💖</h1>
          <img
            src="https://media.giphy.com/media/26BRv0ThflsKCqLXG/giphy.gif"
            alt="Celebration"
            className='image'
          />
          <p style={{fontSize: '1.5rem', color: '#881337'}}>
            See you on the 14th! <br/>
            (I knew you'd say yes 😉)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='card'>
        <img
          src="https://media.giphy.com/media/lnI1FGf8hUzq/giphy.gif"
          alt="Cute ask"
          className='image'
        />

        <h1 className='heading'>Will you be my Valentine?</h1>

        <div className='buttonGroup'>
          <button
            className='yesButton'
            style={{ transform: `scale(${1 + hoverCount * 0.1})`}}
            onClick={handleYesClick}
          >
            Yes 💖
          </button>

          <button
            className={`no-btn ${hoverCount > 0 ? "move" : ""}`}
            style={hoverCount > 0 ? noButtonPosition : {}}
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
          >
            {hoverCount === 0 ? "No" : pleas[Math.min(hoverCount, pleas.length - 1)]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValentineProposal;
