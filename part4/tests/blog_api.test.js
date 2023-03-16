const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../app");
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

describe("Tests that validate blots in DB", () => {
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
});
describe("validates posting features", () => {
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

    /*   const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1); */

    /*  const titles = blogsAfter.map((blog) => blog.title);
    expect(titles).toContain("How to test with supertest and jest"); */
  });

  test("blogs with no title nor url can't be posted", async () => {
    const badBlog = {
      author: "Bad author",
    };
    await api.post("/api/blogs").send(badBlog).expect(400);

    const blogsAfter = await helper.blogsInDb();

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
  });
});

describe("Tests that modify the current state of the database", ()=>{
  test("can delete a single blog", async () => {
    const blogsBefore = await helper.blogsInDb();
    const blogToDelete = blogsBefore[0];
  
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  
    const blogsAfter = await helper.blogsInDb();
  
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1);
  
    const titles = blogsAfter.map((blog) => blog.title);
  
    expect(titles).not.toContain(blogToDelete.title);
  });
  
  test("can modify an existing blog", async () => {
    const blogsBefore = await helper.blogsInDb();
    const blogToEdit = blogsBefore[0];
  
    const editedBlog = { ...blogToEdit, likes: 85 };
    const modifiedResponse = await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(editedBlog)
      .expect("Content-type", /application\/json/);
    expect(modifiedResponse.body).not.toEqual(blogToEdit);
  });
  
})

afterAll(async () => {
  await mongoose.connection.close();
});
