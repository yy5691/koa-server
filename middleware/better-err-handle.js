module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
  }
};
