import { useEffect, useState } from 'react';
import uniqid from 'uniqid';

const AnimatedDie = ({ num, isHeld, holdDie }) => {
  const [presentClass, setPresentClass] = useState("");

  useEffect(() => {
    setPresentClass(`show__${num}`)
  }, [num])

  const styles = {
    backgroundColor: isHeld ? "#59e391" : "#fff",
  };

  function generateDots(iter) {
    const dots = [];
    for(let i = 0; i < iter; i++){
      dots.push(<span className="dot" key={uniqid()}></span>);
    }
    return dots;
  }

  const fullDie = (
    <div className={`anim__die ${presentClass}`}>
      <div className="die__face die__face__1 die__face-dot1" style={styles}>
        {generateDots(1)}
      </div>
      <div className="die__face die__face__2 die__face-dot2" style={styles}>
        {generateDots(2)}
      </div>
      <div className="die__face die__face__3 die__face-dot3" style={styles}>
        {generateDots(3)}
      </div>
      <div className="die__face die__face__4 die__face-dot4" style={styles}>
        {generateDots(4)}
      </div>
      <div className="die__face die__face__5 die__face-dot5" style={styles}>
        {generateDots(5)}
      </div>
      <div className="die__face die__face__6 die__face-dot6" style={styles}>
        {generateDots(6)}
      </div>
    </div>
  )
  
  return (
    <div className="die__container" onClick={holdDie}>
      {fullDie}
    </div>
  );
}
 
export default AnimatedDie;