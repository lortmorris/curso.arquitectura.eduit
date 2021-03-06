
module.exports = ({ app, os }) => {
  const numCPUs = os.cpus();

  app.get('/health', (req, res) => {
    res.json({
      pid: process.pid,
      uptime: process.uptime(),
      hostname: os.hostname,
      cpu: numCPUs,
      memory: {
        total: os.totalmem(),
        freemen: os.freemem(),
      },
      hostuptime: os.uptime(),
    });
  });
}
