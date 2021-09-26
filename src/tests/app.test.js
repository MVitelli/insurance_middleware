import request from "supertest";
import chai from "chai";
import app from "../../app.js";
import { adminCredentials, loginResponse } from "./mocks/credentials.js";
import { clientsResponseWithPolicies } from "./mocks/clientsResponse.js";

const { expect } = chai;
describe("POST /login", () => {
  it("should throw error if username or password are not provided", async () => {
    const response = await request(app).post("/login");

    expect(response.status).to.equal(400);
  });
  it("should return access token if user exists", async () => {
    const response = await request(app).post("/login").send(adminCredentials);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.all.keys(Object.keys(loginResponse));
  });
});
describe("GET /clients", () => {
  it("should be able to get clients if authorization header is provided from login info", async () => {
    const response = await request(app).post("/login").send(adminCredentials);

    const clientsRes = await request(app)
      .get("/clients")
      .set("Authorization", `Bearer ${response.body.accessToken}`);

    expect(clientsRes.status).to.equal(200);
    clientsRes.body.forEach((client) => {
      expect(client).to.have.all.keys(
        Object.keys(clientsResponseWithPolicies[0])
      );
    });
  });
});
