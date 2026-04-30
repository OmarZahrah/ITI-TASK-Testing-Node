const request = require("supertest");
const app = require("..");
const { clearDatabase } = require("../db.connection");

describe("todo routes", () => {
  let testAgent = request(app);
  afterEach(async () => {
    await clearDatabase();
  });
  it("(GET /todo ) should respond with todos=[]", async () => {
    let res= await testAgent.get("/todo")
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveSize(0);
  });
  it("(POST /todo) without auth: should respond with please login first",async()=>{
    let res= await testAgent.post("/todo").send({title:"eat breakfast"})
    expect(res.status).toBe(401);
    expect(res.body.message).toContain("please login first")
  })
  it("(POST /todo) should respond with new todo",async()=>{
    let newUser = { name: "Hoda", email: "test@test.com", password: "1234567" };
    await testAgent.post("/user/signup").send(newUser);

    let res1 = await testAgent.post("/user/login").send(newUser);
    let token= res1.body.data

    let res= await testAgent.post("/todo").send({title:"eat breakfast"}).set({authorization:token})
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("eat breakfast")
  })
});
