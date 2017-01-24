const os = require('os');
const cpuInfo = os.cpus();
const spawn = require('child_process').spawn;

let startPORT = 7000;
const FORKS = [];

const fork =(cpu)=>{
  FORKS.push({
    spawn: spawn('node', ['app.js', '--port='+(startPORT++)]),
    cpu: cpu
  });
}

const addListenes =()=>{
  FORKS.forEach( (fork, index)=>{
    console.log(fork.spawn.pid);
    const lineInfo = `CPU[${index}] - PID: ${fork.spawn.pid} : `;
    fork.spawn.stdout.on('data', (data) => {
      console.log(`stdout: ${lineInfo} ${data}`);
    });

    fork.spawn.stderr.on('data', (data) => {
      console.log(`stderr: ${lineInfo}  ${data}`);
    });

    fork.spawn.on('close', (code) => {
      console.log(`child process exited with code  ${lineInfo}  ${code}`);
    });
  });
}


cpuInfo.forEach(cpu=> fork(cpu));
addListenes();
