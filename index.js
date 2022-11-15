const express = require('express');
const expressStatusMonitor = require('express-status-monitor');
const auth = require('http-auth');
const app = express();
const statusMonitor = expressStatusMonitor();

const basic = auth.basic({realm : 'Monitor Dashboard'}, (user, pass, callback) => {
  callback(user === 'username' && pass === 'password')
})

app.use(statusMonitor.middleware);

app.get('/status/monitor', basic.check(statusMonitor.pageRoute));

app.get('/', (req, res) => {
  res.json({
    'message' : "Hello dev how are you?",
    "data" : ["Greet", "Welcome"]
  })
});

app.listen(2000, () => console.log("application is serving"));
