const mongoose = require("mongoose");
const request = require("supertest");
const server = require("../server");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
    await server.close();
  });

describe("GET /api/user", () => {
    it("should return all users", async () => {
      const res = await request(server).get("/user");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

describe("POST /api/user", () => {
    it("should create a user", async () => {
    const res = await request(server).post("/user").send({
        userName: "pear",
        firstName: "frank",
        lastName: "sonata",
        password: "password",
        email: "franky@mail.com"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.userName).toBe("pear");
    });
});