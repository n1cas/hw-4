import { hobbyRoutes, userRoutes } from './src/routes';
import * as http from 'http';

const server = http.createServer((req, res)  => {
  if (req.url?.startsWith('/users')) {
    userRoutes(req, res);
  } else if (req.url?.startsWith('/hobbies')) {
    hobbyRoutes(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});