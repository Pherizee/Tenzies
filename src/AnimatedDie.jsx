import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import "./Die.css"

const AnimatedDie = ({ num, isHeld, holdDie }) => {
  const [presentClass, setPresentClass] = useState("");

  const styles = {
    backgroundColor: isHeld ? "#59e391" : "#fff",
  };

  useEffect(() => {
    setPresentClass(`show__${num}`)
  }, [num])

  function generateDots(iter) {
    const dots = [];
    for(let i = 0; i < iter; i++){
      dots.push(<span className="dot" key={uniqid()}></span>);
    }
    return dots;
  }


  const fullDie = [
    <div className={`anim__die ${presentClass}`}>
      <div className="die__face die__face__1" style={styles}>
        {generateDots(1)}
      </div>
      <div className="die__face die__face__2" style={styles}>
        {generateDots(2)}
      </div>
      <div className="die__face die__face__3" style={styles}>
        {generateDots(3)}
      </div>
      <div className="die__face die__face__4" style={styles}>
        {generateDots(4)}
      </div>
      <div className="die__face die__face__5" style={styles}>
        {generateDots(5)}
      </div>
      <div className="die__face die__face__6" style={styles}>
        {generateDots(6)}
      </div>
    </div>
  ]
  
  return (
    <div className="die__container" onClick={holdDie}>
      {fullDie}
    </div>
  );
}
 
export default AnimatedDie;