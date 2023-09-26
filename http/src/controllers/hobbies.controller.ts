import { DataRepository } from "../database";
import { parseRequestData, sendJsonResponse } from "../utils";
import { IncomingMessage, ServerResponse } from 'http';

export class HobbiesController {
  static getUserHobbies(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url?.split('/')[2];

    sendJsonResponse(res, 200, DataRepository.getUserHobbies(userId));
  }

  static addUserHobby(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url.split('/')[2];
    const user = DataRepository.getUserById(userId);
    if (!user) {
      sendJsonResponse(res, 404, { message: 'User not found' });
      return;
    }

    parseRequestData(req, (data) => {
      const hobby = JSON.parse(data);

      sendJsonResponse(res, 201, DataRepository.addUserHobby(userId, hobby));
    });
  }

  static deleteHobbiesForUser(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url.split('/')[2];
    const user = DataRepository.getUserById(userId);
    if (!user) {
      sendJsonResponse(res, 404, { message: 'User not found' });
      return;
    }

    DataRepository.deleteUserHobby(userId);
    sendJsonResponse(res, 200, { message: 'Hobbies deleted successfully' });
  }
}

