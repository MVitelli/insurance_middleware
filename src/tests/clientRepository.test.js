import chai from "chai";
import sinon from "sinon";
import customAxios from "../utils/customAxios.js";
import { clientsResponse, existentUserName } from "./mocks/clientsResponse.js";
import clientRepository from "../repositories/clientRepository.js";

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("ClientRepository", () => {
  afterEach(() => {
    sandbox.restore();
  });
  it("should be able to filter clients by name provided as argument", async () => {
    sandbox.stub(customAxios, "get").returns(clientsResponse);
    const clients = await clientRepository.getAll(
      { role: "admin" },
      null,
      existentUserName
    );

    expect(clients[0].name).to.equal(existentUserName);
  });
});
