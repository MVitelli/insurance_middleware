import chai from "chai";
import sinon from "sinon";
import customAxios from "../utils/customAxios.js";
import policyRepository from "../repositories/policyRepository.js";
import {
  clientIdWithPolicies,
  policiesResponse,
} from "./mocks/policiesResponse.js";

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("PolicyRepository", () => {
  afterEach(() => {
    sandbox.restore();
  });
  it("should be able to get all the policies from a policy if user is an admin", async () => {
    sandbox.stub(customAxios, "get").returns(policiesResponse);
    const policies = await policyRepository.getByClientId(
      { role: "admin" },
      clientIdWithPolicies
    );

    policies.forEach((policy) => {
      expect(policy.clientId).to.be.equal(clientIdWithPolicies);
    });
  });
});
