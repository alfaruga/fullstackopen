const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogsObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
afterAll(async () => {
  mongoose.connection.close();
});

test("gets blogs as json with the right length", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(6);
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
test("posting a single blog works", async () => {
  const blogToPost = {
    title: "How to test with supertest and jest",
    author: "Me",
    url: "wwww.example.com",
    likes: "65",
  };

  await api
    .post("/api/blogs")
    .send(blogToPost)
    .expect(201)
    .expect("Content-type", /application\/json/);

  /*   const blogsAfter = await helper.notesInDb();
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1); */

  /*  const titles = blogsAfter.map((blog) => blog.title);
  expect(titles).toContain("How to test with supertest and jest"); */
});
test("all posts have # of likes, if not, make it 0", async () => {
  const blogWithNolikes = {
    title: "What if it has no likes property",
    author: "Me",
    url: "wwww.example.com",
  };

  const blog = await api
    .post("/api/blogs")
    .send(blogWithNolikes)
    .expect(201)
    .expect("Content-type", /application\/json/);
  const likes = blog.body.likes;
  expect(likes).toBeDefined();
  expect(likes).toBeGreaterThanOrEqual(0);
});
test("blogs with no title nor url can't be posted", async () => {
  const badBlog = {
    author: "Bad author",
  };
  console.log("reaches, this point", badBlog);
  await api.post("/api/blogs").send(badBlog).expect(400);

  const blogsAfter = await helper.notesInDb();

  expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
});
