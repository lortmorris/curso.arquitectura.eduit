const getSnake = (elements) => {
  let output = [];
  if (elements.length === 0) return '';
  if (elements.length === 1) return elements[0].join(';');
  output = output.concat(elements.shift());

  let lastWay = true;
  const rway = () => {
    for (let x = 0; x < elements.length; x += 1) {
      if (x === elements.length - 1) output = output.concat(elements.pop().reverse());
      else output = output.concat(elements[x].pop());
    }
    lastWay = false;
  };

  const lway = () => {
    for (let x = elements.length - 1; x >= 0; x -= 1) {
      if (x === 0) output = output.concat(elements.shift());
      else output = output.concat(elements[x].shift());
    }
    lastWay = true;
  };

  while (elements.length > 0) {
    if (lastWay) rway();
    else lway();
  }
  return output.join(';');
};

console.info(
  getSnake([
    [1],
    [2, 3],
    [4, 5, 6],
    [7],
    [8, 9, 10],
  ]),
);

