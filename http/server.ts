import { hobbyRoutes, userRoutes } from './src/routes';
import * as http from 'http';
import { sendJsonResponse } from './src/utils';
import * as dotenv from 'dotenv';
dotenv.config();


const server = http.createServer((req, res)  => {
  if (req.url?.startsWith('/users')) {
    userRoutes(req, res);
  } else if (req.url?.startsWith('/hobbies')) {
    hobbyRoutes(req, res);
  } else {

    sendJsonResponse(res, 404, { message: 'Invalid URL' })
  }
});

const PORT= process.env.port || 3000;
server.listen(PORT, () => {
  
  console.log(`Server is running on port ${PORT}`);
});