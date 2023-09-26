import { User } from "../interfaces";

export class DataRepository {
  static users: User[] = [
    {
      id: 1,
      name: 'Ann',
      email: 'ann@google.com',
      hobbies: ['books', 'sport', 'dancing'],
    },
    {
      id: 2,
      name: 'Ben',
      email: 'ben@google.com',
      hobbies: ['series', 'sport'],
    }
  ]

  static getUserById(id: string): User {
    return this.users.find((user) => user.id.toString() === id)
  }
  static usersLength(): number {
    return this.users.length;
  }

  static addUser(user: User): void {
    this.users.push(user);
  }

  static getUsers(): User[] {
    return this.users;
  }

  static deleteUser(id: string): User {
    const index = this.users.findIndex((user) => user.id.toString() === id);

    return index ? this.users.splice(index, 1)[0] : null;
  }

  static updateUser(id: string, user: User): User {
    const index = this.users.findIndex((user) => user.id.toString() === id);
    if (!index) {
      return null;
    }

    return this.users[index] = { ...this.users[index], ...user };
  }

  static getUserHobbies(id: string): string[] {
    return this.users[id]?.hobbies || []
  }

  static addUserHobby(id: string, hobby: string): string[] {
    const index = this.users.findIndex((user) => user.id.toString() === id);
    if (!index) {
      return null;
    }

    this.users[index]?.hobbies.push(hobby);

    return this.users[index]?.hobbies
  }

  static deleteUserHobby(id: string): string[] {
    this.users[id].hobbies = [];
    return this.users[id]?.hobbies;
  }
}