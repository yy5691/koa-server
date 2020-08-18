const bcrypt = require('bcrypt')

const encrypt = password => {
  const salt = bcrypt.genSaltSync(5)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const decrypt = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  encrypt, decrypt
}
