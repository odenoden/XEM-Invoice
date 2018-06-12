
export function getNowDateTime () {
    //今日の日付データを変数hidukeに格納
    const dt = new Date()
 
    //年・月・日を取得する
    const year = dt.getFullYear()
    const month = dt.getMonth() + 1
    const day = dt.getDate()
  
    //時・分・秒を取得する
    var hour = dt.getHours()
    var minute = dt.getMinutes()
    var second = dt.getSeconds()
  
    return year + '/' + month + '/' + day + ' ' + hour + ':' + ('00' + minute).slice(-2) + ':' + ('00' + second).slice(-2)
  }
  