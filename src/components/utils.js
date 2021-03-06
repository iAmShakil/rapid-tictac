// calculates if there's already a winner. Copied from React's official DOC
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

function isDraw(squares){
  for (let i = 0; i < squares.length; i++) {
    var element = squares[i]
    if(!element){
      return false;
    }
  }
  return true
}
function getCurrentTime(){
  var date = new Date()
  var time = date.getTime()
  return time
}
export {calculateWinner, isDraw, getCurrentTime}