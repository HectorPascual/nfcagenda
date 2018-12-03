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
  }
  else {
    url_def = url
    from_now = true
  }
  return [url_def,array,from_now]
}

module.exports = {
    formatDate: formatDate,
    formatHour: formatHour,
    parseURL: parseURL
};
