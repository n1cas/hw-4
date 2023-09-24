import { parseRequestData, sendJsonResponse } from "../utils";
import { users } from "./../database";
import { IncomingMessage, ServerResponse } from 'http';

export function getUserHobbies(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split('/')[2];
  const hobbies =  userId ? users[userId].hobbies : [];
  sendJsonResponse(res, 200, hobbies);
}

export function addHobbyForUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url.split('/')[2];
  parseRequestData(req, (data) => {
    const hobby = JSON.parse(data);
    if (!users[userId]) {
      sendJsonResponse(res, 404, { message: 'User not found' });
      return;
    }
    users[userId].hobbies.push(hobby);
    sendJsonResponse(res, 201, hobby);
  });
}

export function deleteHobbiesForUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url.split('/')[2];
  users[userId].hobbies = [];
  sendJsonResponse(res, 200, { message: 'Hobbies deleted successfully' });
}