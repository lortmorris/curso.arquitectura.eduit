const os = require('os');
const cpuInfo = os.cpus();
const spawn = require('child_process').spawn;

let startPORT = 7000;
const FORKS = {};

const fork =(cpu, index)=>{
  console.log(`starting fork ${index}`);
  FORKS[index] = {
    spawn: spawn('node', ['app.js', '--port='+(startPORT++)]),
    cpu: cpu
  };
  addListener(index);
}

const addListener =(index)=>{
  const child = FORKS[index];

    const lineInfo = `CPU[${index}] - PID: ${child.spawn.pid} : `;
    child.spawn.stdout.on('data', (data) => {
      console.log(`stdout: ${lineInfo} ${data}`);
    });

    child.spawn.stderr.on('data', (data) => {
      console.log(`stderr: ${lineInfo}  ${data}`);
    });

    child.spawn.on('close', (code) => {
      console.log(`child process exited with code  ${lineInfo}  ${code}`);
      fork(child.cpu, index);
    });

}


cpuInfo.forEach((cpu, index)=> fork(cpu, index));
