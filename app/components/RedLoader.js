export default() => {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve({
        redInternal: require('./redInternal')
      });
    });
  });
};
