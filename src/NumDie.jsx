const NumDie = ({ num, isHeld, holdDie }) => {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "#fff",
  }

  return (
    <div className={`die`} style={styles} onClick={holdDie}>
      {num}
    </div>
  );
};

export default NumDie;
