import { IncomingMessage, ServerResponse } from "http";
import { users } from "../database";
import { User } from "../interfaces";
import { parseRequestData, sendJsonResponse } from "../utils";

export function createUser(req: IncomingMessage, res: ServerResponse) {
  parseRequestData(req, (data) => {
    const user = JSON.parse(data);
    user.id = users.length + 1;
    users.push(user);
    sendJsonResponse(res, 201, user);
  });
}

export function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  const responseUsers = users.map(({name, id, email}: User )=> {
    return {name, id, email}
  })
  sendJsonResponse(res, 200, responseUsers);
}

export function getUserById(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url.split('/')[2];
  const user = users.find((user) => user.id.toString() === userId);
  if (user) {
    const {name, id, email} =  user

    sendJsonResponse(res, 200, {name, id, email});
  } else {
    sendJsonResponse(res, 404, { message: 'User not found' });
  }
}

export function deleteUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url.split('/')[2];
  const index = users.findIndex((user) => user.id.toString() === userId);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    sendJsonResponse(res, 200, deletedUser);
  } else {
    sendJsonResponse(res, 404, { message: 'User not found' });
  }
}

export function updateUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url.split('/')[2];
  const index = users.findIndex((user) => user.id.toString() === userId);
  if (index !== -1) {
    parseRequestData(req, (data) => {
      const updatedUser = JSON.parse(data);
      users[index] = { ...users[index], ...updatedUser };
      sendJsonResponse(res, 200, users[index]);
    });
  } else {
    sendJsonResponse(res, 404, { message: 'User not found' });
  }
}