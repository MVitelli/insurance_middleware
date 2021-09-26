import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import customAxios from "../utils/customAxios.js";
import {
  anotherUserId,
  clientsResponse,
  existentUserId,
  unexistentUserid,
} from "./mocks/clientsResponse.js";
import AxiosRepository from "../repositories/axiosRepository.js";
import ApiError from "../utils/customError.js";

chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("AxiosRepository", () => {
  const DEFAULT_LIMIT = 10;
  let axiosRepository;
  beforeEach(() => {
    axiosRepository = new AxiosRepository("Clients");
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe("getAll", () => {
    it("should get elements until default limit (10) if client is admin", async () => {
      sandbox.stub(customAxios, "get").returns(clientsResponse);
      const clients = await axiosRepository.getAll({ role: "admin" });

      expect(clients.length).to.equal(DEFAULT_LIMIT);
      clients.forEach((elem) => {
        expect(elem).to.have.all.keys(Object.keys(clientsResponse.data[0]));
      });
    });
    it("should get elements until limit passed as argument if client is admin", async () => {
      const newLimit = 5;
      sandbox.stub(customAxios, "get").returns(clientsResponse);
      const elements = await axiosRepository.getAll(
        { role: "admin" },
        newLimit
      );
      expect(elements.length).to.equal(newLimit);
    });
    it("should retrieve only its own details (or no details) if client is not admin", async () => {
      sandbox.stub(customAxios, "get").returns(clientsResponse);

      const elements = await axiosRepository.getAll({
        role: "user",
        id: existentUserId,
      });

      expect(elements.length).to.equal(1);
      expect(elements[0].id).to.equal(existentUserId);
    });
  });
  describe("getById", () => {
    it("should get element by id if client is admin", async () => {
      sandbox.stub(customAxios, "get").returns(clientsResponse);
      const element = await axiosRepository.getById(
        { role: "admin" },
        existentUserId
      );
      expect(element[0].id).to.equal(existentUserId);
    });
    it("should throw forbidden error if client is not admin and it asks for another client details", async () => {
      sandbox.stub(customAxios, "get").returns(clientsResponse);
      await expect(
        axiosRepository.getById(
          { role: "user", id: existentUserId },
          anotherUserId,
          true
        )
      )
        .to.eventually.be.rejectedWith("Forbidden")
        .and.be.an.instanceOf(ApiError)
        .and.have.property("status", 403);
    });
    it("should throw not found error if there is no element with id provided", async () => {
      sandbox.stub(customAxios, "get").returns(clientsResponse);
      await expect(
        axiosRepository.getById(
          { role: "user", id: existentUserId },
          unexistentUserid,
          true
        )
      )
        .to.eventually.be.rejectedWith("Not found")
        .and.be.an.instanceOf(ApiError)
        .and.have.property("status", 404);
    });
  });
});
