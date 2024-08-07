const logEvents = async (req, res, next) => {
  const logItem = `${req.method}\t${req.url}`;
  console.log(logItem);
  next();
}

module.exports = logEvents;