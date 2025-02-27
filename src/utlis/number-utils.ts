const pad = (num: number, size: number) => {
  let _num = num.toString();
  while (_num.length < size) _num = "0" + num;
  return _num;
}

const toHour = (time: number) => {
  return Math.floor(time / 3600);
}
const toMinute = (time: number) => {
  return Math.floor((time - toHour(time)) / 60);
}
const toSecond = (time: number) => {
  return time - (toHour(time) * 3600 + toMinute(time) * 60);
}
const parseTime = (time: number) => {
  const hours = toHour(time);
  const minutes = toMinute(time);
  const seconds = toSecond(time);
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
}


export {toHour, toMinute, toSecond, parseTime};