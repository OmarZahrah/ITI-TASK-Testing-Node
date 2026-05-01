const request = require("supertest");
const app = require("..");
const { clearDatabase } = require("../db.connection");

describe("lab testing:", () => {
  let testAgent = request(app);

  afterEach(async () => {
    await clearDatabase();
  });

  describe("users routes:", () => {
    it("(GET /user/search) should respond with the correct user with the name requested", async () => {
      const newUser = {
        name: "Ali",
        email: "ali@test.com",
        password: "1234567",
      };

      await testAgent.post("/user/signup").send(newUser);

      const res = await testAgent.get("/user/search").query({ name: "Ali" });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(newUser.name);
      expect(res.body.data.email).toBe(newUser.email);
    });

    it("GET /user/search with invalid name should respond with status 404 and the message", async () => {
      const res = await testAgent.get("/user/search").query({ name: "NoUser" });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("There is no user with name: NoUser");
    });
  });

  describe("todos routes:", () => {
    it("(PATCH /todo) without title with id only should respond with res status 400 and a message", async () => {
      const newUser = {
        name: "Hoda",
        email: "hoda@test.com",
        password: "1234567",
      };

      await testAgent.post("/user/signup").send(newUser);
      const loginRes = await testAgent.post("/user/login").send(newUser);
      const token = loginRes.body.data;

      const todoRes = await testAgent
        .post("/todo")
        .send({ title: "eat breakfast" })
        .set({ authorization: token });

      const res = await testAgent
        .patch(`/todo/${todoRes.body.data._id}`)
        .set({ authorization: token })
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("must provide title and id to edit todo");
    });

    it("(PATCH /todo) with id and title should respond with status 200 and the new todo", async () => {
      const newUser = {
        name: "Hoda",
        email: "hoda2@test.com",
        password: "1234567",
      };

      await testAgent.post("/user/signup").send(newUser);
      const loginRes = await testAgent.post("/user/login").send(newUser);
      const token = loginRes.body.data;

      const todoRes = await testAgent
        .post("/todo")
        .send({ title: "eat breakfast" })
        .set({ authorization: token });

      const res = await testAgent
        .patch(`/todo/${todoRes.body.data._id}`)
        .set({ authorization: token })
        .send({ title: "eat lunch" });

      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(todoRes.body.data._id);
      expect(res.body.data.title).toBe("eat lunch");
    });

    it("(GET /todo/user) should respond with the user's all todos", async () => {
      const newUser = {
        name: "Hoda",
        email: "hoda3@test.com",
        password: "1234567",
      };

      await testAgent.post("/user/signup").send(newUser);
      const loginRes = await testAgent.post("/user/login").send(newUser);
      const token = loginRes.body.data;

      await testAgent
        .post("/todo")
        .send({ title: "eat breakfast" })
        .set({ authorization: token });
      await testAgent
        .post("/todo")
        .send({ title: "study" })
        .set({ authorization: token });

      const res = await testAgent
        .get("/todo/user")
        .set({ authorization: token });

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveSize(2);
      expect(res.body.data.map((todo) => todo.title)).toEqual([
        "eat breakfast",
        "study",
      ]);
    });

    it("(GET /todo/user) for a user hasn't any todo, should respond with status 200 and a message", async () => {
      const newUser = {
        name: "Hoda",
        email: "hoda4@test.com",
        password: "1234567",
      };

      await testAgent.post("/user/signup").send(newUser);
      const loginRes = await testAgent.post("/user/login").send(newUser);
      const token = loginRes.body.data;

      const res = await testAgent
        .get("/todo/user")
        .set({ authorization: token });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Couldn't find any todos for this user");
    });
  });
});
