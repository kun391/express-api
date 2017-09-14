let momentTz = require('moment-timezone')

let timeNow = () => {
  let time = momentTz.tz(new Date(), 'America/Los_Angeles')
  return time
}
let timeCreated = () => {
  let time = momentTz.tz(new Date(), 'America/Los_Angeles').format('YYYY-MM-DD HH:mm:ss')
  return time
}
let parseISO8601 = (t) => {
  let time = momentTz.tz(t, 'America/Los_Angeles').format()
  return time
}
let parseTimeLLLL = (t) => {
  return momentTz.tz(t, 'America/Los_Angeles').format('llll')
}
exports = module.exports = {
  parseISO8601,
  timeCreated,
  parseTimeLLLL,
  timeNow
}
