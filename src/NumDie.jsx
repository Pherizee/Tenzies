import { useState, useEffect } from 'react';
import uniqid from "uniqid"

const NumDie = ({ num, isHeld, holdDie }) => {
  const [presentClass, setPresentClass] = useState("");
  
  useEffect(() => {
    setPresentClass(`show__${num}`)
  }, [num])

  const styles = {
    backgroundColor: isHeld ? "#59e391" : "#fff",
  }

  function generateFullDie() {
    const fullDie = []
    for(let i = 1; i < 7; i++) {
      fullDie.push(<div className={`die__face die__face__${i} die__face-num`} style={styles} key={uniqid()}>{i}</div>);
    }
    return fullDie;
  }

  const fullDie = [
    <div className={`anim__die ${presentClass}`}>
      {generateFullDie()}
    </div>
  ]

  return (
    <div className="die__container" onClick={holdDie}>
      {fullDie}
    </div>
  );
};

export default NumDie;
