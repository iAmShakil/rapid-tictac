function getCurrentTime(){
    var date = new Date()
    var time = date.getTime()
    return time
}

module.exports = {
    getCurrentTime
}