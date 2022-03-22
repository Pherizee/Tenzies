const Die = ({ num, isHeld, holdDie }) => {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "#fff"
  }

  return (
    <div className="die" style={styles} onClick={holdDie}><span>{num}</span></div>
  );
}
 
export default Die;
