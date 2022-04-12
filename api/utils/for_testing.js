const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.length === 0 ? 0 : array.reduce(reducer) / array.length;
};

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs;

module.exports = {
  reverse,
  average,
  dummy,
  totalLikes,
};
