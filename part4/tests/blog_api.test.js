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
    await User.deleteMany({});
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };
    await api.post("/api/users").send(userAndPass);
    const loginData = await api.post("/api/login").send(userAndPass);

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
  beforeEach(async () => {
    await User.deleteMany({});
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };
    await api.post("/api/users").send(userAndPass);
  });

  test("posting a single blog works", async () => {
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };
    const loginData = await api.post("/api/login").send(userAndPass);

    const blogToPost = {
      title: "How to test with supertest and jest",
      author: "Me",
      url: "wwww.example.com",
      likes: "65",
    };

    await api
      .post("/api/blogs")
      .send(blogToPost)
      .set("authorization", "Bearer " + loginData.body.token)
      .expect(201)
      .expect("Content-type", /application\/json/);

    //expect(blogsAfter).toHaveLength(dbBlogs.length + 1)

    /*  const titles = blogsAfter.map((blog) => blog.title);
    expect(titles).toContain("How to test with supertest and jest"); */
  });
  test("blogs with no title nor url cant be posted", async () => {
    const blogsBefore = await helper.blogsInDb();
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };

    const loginData = await api.post("/api/login").send(userAndPass);
    const badBlog = {
      author: "Bad author",
    };

    await api
      .post("/api/blogs")
      .send(badBlog)
      .set("authorization", "Bearer " + loginData.body.token)
      .expect(400);

    const blogsAfter = await helper.blogsInDb();
    console.log(
      "lengths: before and after: ",
      blogsBefore.length,
      blogsAfter.length
    );
    expect(blogsAfter).toHaveLength(blogsBefore.length);
  });
});

describe("Tests that modify the current state of the database", () => {
  test("can delete a single blog", async () => {
    const authenticationSimplified = await authDataFetch();
    const blogToPost = {
      title: "Terrible blog to check if can delete from test with auth",
      author: "Me",
      url: "wwww.example.com",
      likes: "65",
    };
    await api
      .post("/api/blogs")
      .send(blogToPost)
      .set("authorization", "Bearer " + authenticationSimplified.token)
      .expect(201)
      .expect("Content-type", /application\/json/);

    // const afterPosting = await helper.blogsInDb();
    // expect(afterPosting).toHaveLength(helper.initialBlogs.length + 1);

    const deleteThis = await Blog.findOne({
      title: "Terrible blog to check if can delete from test with auth",
    });
    console.log("Delete: ", deleteThis.name, deleteThis.id);

    await api
      .delete(`/api/blogs/${deleteThis.id.toString()}`)
      .set("authorization", "Bearer " + authenticationSimplified.token)
      .expect(204);

    const deleted = await Blog.findById(deleteThis.id);
    expect(deleted).toBeUndefined();
  });
  test("can modify an existing blog", async () => {
    const blogToPost = {
      title: "Terrible blog to check if can delete from test with auth",
      author: "Me",
      url: "wwww.example.com",
      likes: "65",
    };
    const authenticationSimplified = await authDataFetch();
    const blogToEdit = await api
      .post("/api/blogs")
      .send(blogToPost)
      .set("authorization", "Bearer " + authenticationSimplified.token)
      .expect(201)
      .expect("Content-type", /application\/json/);

    const afterPosting = await helper.blogsInDb();
    expect(afterPosting).toHaveLength(helper.initialBlogs.length + 1);

    const editedBlog = { ...blogToEdit, likes: 85 };
    const modifiedResponse = await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(editedBlog)
      .set("authorization", "Bearer " + authenticationSimplified.token)
      .expect("Content-type", /application\/json/);
    expect(modifiedResponse.body).not.toEqual(blogToEdit);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
