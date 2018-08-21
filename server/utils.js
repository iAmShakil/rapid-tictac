function getCurrentTime(){
    var date = new Date()
    var time = date.getTime()
    return time
}
function timeCounter(timeArray){
    var total = 0
    for( var i = 1; i  < timeArray.length ; i = i + 2 ){
      total += timeArray[i] - timeArray[i-1]
    }
    return total
}
module.exports = {
    getCurrentTime,
    timeCounter
}