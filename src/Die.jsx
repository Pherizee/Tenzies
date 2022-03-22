import uniqid from "uniqid";

const Die = ({ num, isHeld, holdDie }) => {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "#fff",
  };
  
  let diceClass = "";
  switch (num) {
    case 1:
      diceClass = "one";
      break;
    case 2:
      diceClass = "two";
      break;
    case 3:
      diceClass = "three";
      break;
    case 4:
      diceClass = "four";
      break;
    case 5:
      diceClass = "five";
      break;
    case 6:
      diceClass = "six";
      break;
    default:
      break;
  }

  function generateDots() {
    const dieDots = [];
    for (let i = 0; i < num; i++) {
      dieDots.push(<span className="dot" key={uniqid()}></span>);
    }
    return dieDots;
  }

  return (
    <div className={`die ${diceClass}`} style={styles} onClick={holdDie}>
      {generateDots()}
    </div>
  );
};

export default Die;
