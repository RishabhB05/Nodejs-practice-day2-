const fs = require('fs');
const http = require('http');

// Ensure the log file exists (create if missing) before server starts
try {
    fs.writeFileSync('log.txt', '', { flag: 'a' });
} catch (err) {
    console.error('Error ensuring log file exists', err);
}

const server = http.createServer((req, res)=>{
    console.log(`Request received: ${req.url}`);
    //we will store time , ip address , url
    const log = `${req.url}\n -- ${new Date().toISOString()}\n -- ${req.socket.remoteAddress}\n`;
    fs.appendFile('log.txt', log, (err)=>{
        if(err){
            console.error('Error writing to log file', err);
        }   
    });
    res.end('Log recorded\n');
})

server.listen(3000, ()=>{
  console.log('Server is listening on port 3000');
});