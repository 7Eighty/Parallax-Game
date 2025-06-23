module.exports.formatResponse = ({
  statusCode = 0, message = '', data = null, error = null
}) => {
  return { statusCode, message, data, error }
}
