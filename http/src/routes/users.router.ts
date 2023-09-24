import { IncomingMessage, ServerResponse } from "http";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers";

export function userRoutes(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'GET') {
    if (req.url === '/users') {
      getAllUsers(req, res);
      return;
    }
    getUserById(req, res);
    return;
  }

  if (req.method === 'POST') {
    createUser(req, res);
    return;
  }

  if (req.method === 'DELETE') {
    deleteUser(req, res)

  } else if (req.method === 'PATCH') {
    updateUser(req, res)
  }
}