import { DataRepository } from './../database/dataRepository';
import { IncomingMessage, ServerResponse } from "http";
import { User } from "../interfaces";
import { parseRequestData, sendJsonResponse } from "../utils";

export class UserController {
  static userCache:Map<string, User> = new Map();

  static createUser(req: IncomingMessage, res: ServerResponse) {
    parseRequestData(req, (data) => {
      const user = JSON.parse(data);
      user.id = DataRepository.usersLength() + 1;
      user.links.user = req.url;
      DataRepository.addUser(user);
      sendJsonResponse(res, 201, user);
    });
  }

  static getAllUsers(req: IncomingMessage, res: ServerResponse) {
    const responseUsers = DataRepository.getUsers().map(({ name, id, email }: User) => {
      return { name, id, email }
    })
    sendJsonResponse(res, 200, responseUsers);
  }

  static getUserById(req: IncomingMessage, res: ServerResponse) {

    const userId = req.url.split('/')[2];

    const user = this.userCache.has(userId) ? this.userCache.get(userId) : DataRepository.getUserById(userId);

    if (user) {
      const { name, id, email } = user;

      sendJsonResponse(res, 200, { name, id, email });
    } else {
      sendJsonResponse(res, 404, { message: 'User not found' });
    }
  }

  static deleteUser(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url.split('/')[2];
    const deletedUser = DataRepository.deleteUser(userId);
    
    if (deletedUser) {
      sendJsonResponse(res, 200, deletedUser);
      this.userCache.delete(userId);
    } else {
      sendJsonResponse(res, 404, { message: 'User not found' });
    }
  }

  static updateUser(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url.split('/')[2];
    const user = DataRepository.getUserById(userId);
    if (user) {
      parseRequestData(req, (data) => {
        const updatedUser = DataRepository.updateUser(userId, JSON.parse(data));
        this.userCache.delete(userId);
        sendJsonResponse(res, 200, updatedUser);
      });
    } else {
      sendJsonResponse(res, 404, { message: 'User not found' });
    }
  }
}