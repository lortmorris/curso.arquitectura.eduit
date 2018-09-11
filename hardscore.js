

const getScore = (input) => {
  if (input.length < 2) return input.length;

  const combine = (str) => {
    const result = [];
    const iter = (i, temp) => {
      if (i >= str.length) {
        result.push(temp);
        return;
      }
      iter(i + 1, temp + str[i]);
      iter(i + 1, temp);
    };
    iter(0, '');
    return result;
  };

  const finalSubs = combine(input)
    .filter(v => v === v.split('').reverse().join(''))
    .sort((a, b) => a.length > b.length);
  console.info(finalSubs);
  return finalSubs.pop().length * finalSubs.pop().length;
};


console.info(getScore('attract'));
console.info(getScore('acdapmpomp'));
console.info(getScore('azar'));
console.info(getScore('axbawbaseksqke'));
