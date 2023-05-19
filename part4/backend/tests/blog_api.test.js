const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

const Blog = require("../models/blog");
const User = require("../models/user");

describe("Tests that validate blogs in DB", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
    await User.deleteMany({});
  });
  test("gets blogs as json with the right length", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("each blog has a unique ID property", async () => {
    const blogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    blogs.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
  test("all posts have # of likes, if not, make it 0", async () => {
    //First delete all users and add a new user for the tests!

    await User.deleteMany({});
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };
    await api.post("/api/users").send(userAndPass);
    //Login with the created user and get login object for later use
    const loginData = await api.post("/api/login").send(userAndPass);
    console.log("did it log in?", loginData.body);
    const blogWithNolikes = {
      title: "What if it has no likes property",
      author: "Me",
      url: "wwww.example.com",
    };

    const blog = await api
      .post("/api/blogs")
      .send(blogWithNolikes)
      .set("authorization", "Bearer " + loginData.body.token)
      .expect(201)
      .expect("Content-type", /application\/json/);

    expect(blog.body.likes).toBeDefined();
    expect(blog.body.likes).toBeGreaterThanOrEqual(0);
  });
});
describe("validates posting features", () => {
  //First delete all users and add a new user for the tests!

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
    await User.deleteMany({});
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };
    await api.post("/api/users").send(userAndPass);
  });

  test("posting a single blog works", async () => {
    /*This is common to all test that require authentication,
    the login data and request to get the login object*/
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
    };
    const loginData = await api.post("/api/login").send(userAndPass);
    console.log("did it log in?", loginData.body);
    //End of common script
    const blogToPost = {
      title: "How to test with supertest and jest",
      author: "MeMe should be 3 chars length",
      url: "wwww.example.com",
      likes: "65",
    };
    console.log("this is the token, should match", loginData.body.token);
    const blogsBefore = await helper.blogsInDb();
    await api
      .post("/api/blogs")
      .send(blogToPost)
      .set("authorization", "Bearer " + loginData.body.token)
      .expect(201)
      .expect("Content-type", /application\/json/);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length + 1);

    /*  const titles = blogsAfter.map((blog) => blog.title);
    expect(titles).toContain("How to test with supertest and jest"); */
  });
  test("blogs with no title nor url cant be posted", async () => {
    const blogsBefore = await helper.blogsInDb();
    /*This is common to all test that require authentication,
    the login data and request to get the login object*/
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };

    const loginData = await api.post("/api/login").send(userAndPass);
    //End of common script

    const badBlog = {
      author: "Bad author",
    };

    await api
      .post("/api/blogs")
      .send(badBlog)
      .set("authorization", "Bearer " + loginData.body.token)
      .expect(400);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length);
  });
});

describe("Tests that modify the current state of the database", () => {
  //First delete all users and add a new user for the tests!

  var loginData;
  var blogToPost;
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);

    const newUser = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };
    await api.post("/api/users").send(newUser);

    const userAndPass = {
      username: "NormaTest",
      password: "2011",
    };
    loginData = await api.post("/api/login").send(userAndPass);

    blogToPost = {
      title:
        "Terrible blog to check if can delete and edit from test with auth",
      author: "Mess",
      url: "wwww.example.com",
      likes: "65",
    };
    await api
      .post("/api/blogs")
      .send(blogToPost)
      .set("authorization", "Bearer " + loginData.body.token)
      .expect(201)
      .expect("Content-type", /application\/json/);

    const dbBefore = await helper.blogsInDb();
    const titlesBefore = dbBefore.map((blog) => blog.title);
    console.log("before deleting", titlesBefore);
  });

  test("can delete a single blog", async () => {
    const blogToDelete = await Blog.findOne({
      title:
        "Terrible blog to check if can delete and edit from test with auth",
    });

    await api
      .delete(`/api/blogs/${blogToDelete.id.toString()}`)
      .set("authorization", "Bearer " + loginData.body.token)
      .expect(204);
    const afterDeleting = await helper.blogsInDb();
    const titles = afterDeleting.map((blog) => blog.title);
    console.log(titles);
    expect(titles).not.toContain(blogToPost.title);
  });
  test("can modify an existing blog", async () => {
    const blogToEdit = await Blog.findOne({
      title:
        "Terrible blog to check if can delete and edit from test with auth",
    });

    const editedBlog = { ...blogToEdit.toJSON(), title: "We made it!" };

    const modifiedResponse = await api
      .put(`/api/blogs/${blogToEdit.id.toString()}`)
      .send(editedBlog)
      .set("authorization", "Bearer " + loginData.body.token)
      .expect("Content-type", /application\/json/);

    expect(modifiedResponse.body).not.toEqual(blogToEdit.body);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
