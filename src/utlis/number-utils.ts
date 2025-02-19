const pad = (num: number, size: number) => {
  let _num = num.toString();
  while (_num.length < size) _num = "0" + num;
  return _num;
}

const parseTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - (hours * 3600 + minutes * 60);
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
}

export { parseTime };