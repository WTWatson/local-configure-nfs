const exec = require('child_process').exec;
const serverIp = '10.0.0.30';

exec('showmount -e ' + serverIp, function(error, stdout, stderr) {
  console.log(stdout);
});