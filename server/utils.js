// ------------------------------------------------ //
// -------------------- UTILS --------------------- //
// ------------------------------------------------ //
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatHour(date){
  str = ("0" + date.getHours()).slice(-2) + ":" +
   ("0" + date.getMinutes()).slice(-2)
   return str
}

//create a server object:
function parseURL(url){
  var array = []
  var from_now
  if(url.indexOf('?') >= 0){
    url_def = url.substring(0, url.indexOf('?'));
    array = url.substring(url.indexOf('?')+1,url.length).split("&");
    if(url.charAt(url.indexOf('?')+1) == 'l' && array.length == 1) from_now = true;
    else from_now = false
  }
  else {
    url_def = url
    from_now = true
  }
  return [url_def,array,from_now]
}

function parseDay(day){
  switch(day){
    case "Mon" :
      return 1
    break;
    case "Tue" :
      return 2
    break;
    case "Wed" :
      return 3
    break;
    case "Thu" :
      return 4
    break;
    case "Fri" :
      return 5
    break;
    default :
    break;
  }
}

module.exports = {
    formatDate: formatDate,
    formatHour: formatHour,
    parseURL: parseURL,
    parseDay: parseDay
};
