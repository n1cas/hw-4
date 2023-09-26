import { IncomingMessage, ServerResponse } from "http";
import { UserController } from "../controllers";

export function userRoutes(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'GET') {
    if (req.url === '/users') {
      UserController.getAllUsers(req, res);
      return;
    }
    
    UserController.getUserById(req, res);
    return;
  }

  if (req.method === 'POST') {
    UserController.createUser(req, res);
    return;
  }

  if (req.method === 'DELETE') {
    UserController.deleteUser(req, res)

  } else if (req.method === 'PATCH') {
    UserController.updateUser(req, res)
  }
}