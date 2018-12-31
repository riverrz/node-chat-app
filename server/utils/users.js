class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room: room.toLowerCase() };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    // return user that was removed
    const removedUser = this.getUser(id);
    if (removedUser) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return removedUser;
  }
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUserList(room) {
    return this.users.filter(user => user.room === room).map(user => user.name);
  }
}

module.exports = { Users };
