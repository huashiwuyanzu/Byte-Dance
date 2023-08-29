// 补零
function addZero(number) {
  if (number < 10) {
    return '0' + number.toString();
  }
  return number.toString();
}

// 获取当前时间
function getNowTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = year + '-' + addZero(month) + '-' + addZero(day);
  return time;
}

module.exports = {
  getNowTime,
};
