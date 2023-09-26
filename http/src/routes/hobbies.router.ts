import { IncomingMessage, ServerResponse } from "http";
import { HobbiesController} from "../controllers";

export function hobbyRoutes(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'GET') {
    HobbiesController.getUserHobbies(req, res)
    return;
  }

  if (req.method === 'POST') {
    HobbiesController.addUserHobby(req, res);
    return;
  }

  if (req.method === 'DELETE') {
    HobbiesController.deleteHobbiesForUser(req, res)
    return;
  }
}