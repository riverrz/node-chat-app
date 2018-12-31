const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Shivam",
        room: "qwerty"
      },
      {
        id: "2",
        name: "Test",
        room: "react"
      },
      {
        id: "3",
        name: "Andrew",
        room: "qwerty"
      }
    ];
  });
  it("should add new user", () => {
    const users = new Users();
    const user = {
      id: "123",
      name: "Shivam",
      room: "qwerty"
    };
    users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });
  it("should return names for qwerty room", () => {
    const userList = users.getUserList("qwerty");
    expect(userList).toEqual(["Shivam", "Andrew"]);
  });
  it("should return names for react room", () => {
    const userList = users.getUserList("react");
    expect(userList).toEqual(["Test"]);
  });

  it("should remove a user", () => {
    // valid id
    const userId = "2";
    const removedUser = users.removeUser(userId);
    expect(removedUser.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it("should not remove a user", () => {
    // invalid id
    const userId = "4";
    const removedUser = users.removeUser(userId);
    expect(users.users.length).toBe(3);
    expect(removedUser).toBe(undefined);
  });
  it("should find user", () => {
    // valid id
    const userId = "3";
    const foundUser = users.getUser(userId);
    expect(foundUser.id).toBe(userId);
  });
  it("should not find user", () => {
    // invalid id
    const userId = "0";
    const foundUser = users.getUser(userId);
    expect(foundUser).toBe(undefined);
  });
});
