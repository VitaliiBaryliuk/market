const http = require('http');

let counter = 0;

setInterval(() => {
  counter += 1;
}, 1000);

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('Server is running2');
  res.end(`
  <h1>SERVER NODE.JS IS WORKING!!!</h1>
  `);
}).listen(3000, () => {
  console.log('Server is running');
});
