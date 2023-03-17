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

describe("Tests that validate blogs in DB", () => {
  test("gets blogs as json with the right length", async () => {
    const blogsInDb = await helper.blogsInDb();

    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(blogsInDb.length);
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
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };

    await api.post("/api/users").send(userAndPass);

    const authData = await api.post("/api/login").send(userAndPass);
    console.log(authData.body.token);
    //

    //console.log('Auth data: ', authData.text)
    const blog = await api
      .post("/api/blogs")
      .send(blogWithNolikes)
      .set("authorization", "Bearer " + authData.body.token)
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
    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };

    await api.post("/api/users").send(userAndPass);

    const authData = await api.post("/api/login").send(userAndPass);

    await api
      .post("/api/blogs")
      .send(blogToPost)
      .set("authorization", "Bearer " + authData.body.token)
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

    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };

    await api.post("/api/users").send(userAndPass);
    const authData = await api.post("/api/login").send(userAndPass);

    await api
      .post("/api/blogs")
      .send(badBlog)
      .set("authorization", "Bearer " + authData.body.token)
      .expect(400);

    const blogsAfter = await helper.blogsInDb();

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
  });
});

describe("Tests that modify the current state of the database", () => {
  test("can delete a single blog", async () => {

    const userAndPass = {
      username: "NormaTest",
      password: "2011",
      name: "normaTest",
    };
    await api.post("/api/users").send(userAndPass);

    const authData = await api.post("/api/login").send(userAndPass);

    const blogToPost = {
      title: "Terrible blog to check if can delete from test with auth",
      author: "Me",
      url: "wwww.example.com",
      likes: "65",
    };

    const blogToDelete = await api
      .post("/api/blogs")
      .send(blogToPost)
      .set("authorization", "Bearer " + authData.body.token)
      .expect(201)
      .expect("Content-type", /application\/json/);
      const afterPosting = await helper.blogsInDb();

    expect(afterPosting).toHaveLength(helper.initialBlogs.length + 1);

    const delteThis = await Blog.findOne({
      title: "Terrible blog to check if can delete from test with auth",
    });

    await api
      .delete(`/api/blogs/${delteThis.id.toString()}`)
      .set("authorization", "Bearer " + authData.body.token)
      .expect(204);


    const blogsAfterDelete = await helper.blogsInDb();

    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAfterDelete.map((blog) => blog.title);

    expect(titles).not.toContain(delteThis.title);

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
});

afterAll(async () => {
  await mongoose.connection.close();
});
