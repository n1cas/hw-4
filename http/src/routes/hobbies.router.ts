import { IncomingMessage, ServerResponse } from "http";
import { addHobbyForUser, deleteHobbiesForUser, getUserHobbies } from "../controllers";

export function hobbyRoutes(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'GET') {
    getUserHobbies(req, res)
    return;
  }

  if (req.method === 'POST') {
    addHobbyForUser(req, res);
    return;
  }

  if (req.method === 'DELETE') {
    deleteHobbiesForUser(req, res)
    return;
  }
}