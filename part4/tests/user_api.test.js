const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((u) => u.save());
  await Promise.all(promiseArray);
});

describe("test for when there's no users in DB", () => {
  test("can add a valid user", async () => {
    const initialUsers = await helper.usersInDb();
    const validUser = {
      username: "Ivy",
      password: "karamazov",
      name: "Ivy",
    };

    await api
      .post("/api/users")
      .send(validUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const userAfterPosting = await helper.usersInDb();

    expect(userAfterPosting).toHaveLength(initialUsers.length + 1);
  });
  test("can't post with an username shorter than 3 characters", async () => {
    const invalidUser = {
      username: "s",
      password: "password is ok",
      name: "something",
    };

    const response = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-type", /application\/json/);

    expect(response.body.error).toContain(
      "User validation failed: username: Path `username` (`s`) is shorter than the minimum allowed length (3)."
    );
  });
  test("can't post with a password shorter than 3 charactes", async () => {
    const invalidUser = { username: "Norma2", password: "20", name: "admin2" };
    const response = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(401)
      .expect("Content-type", /application\/json/);
    console.log(response.body.error);
    expect(response.body.error).toContain(
      "Passwords must be at least 3 characters long"
    );
  });
});
