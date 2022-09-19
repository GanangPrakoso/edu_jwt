const bcrypt = require("bcryptjs");

// 1 nge hash
const hashPassword = (passwordAsli) => bcrypt.hashSync(passwordAsli, 8);

// 2 nge compare / validasi
const comparePasword = (passwordAsli, passwordYangUdahDiHash) =>
  bcrypt.compareSync(passwordAsli, passwordYangUdahDiHash);

module.exports = {
  hashPassword,
  comparePasword,
};
