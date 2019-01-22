
const health = require('./health');
const users = require('./users');

module.exports = Application => ({
  users: users(Application),
  health: health(Application),
});
