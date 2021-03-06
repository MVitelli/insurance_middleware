import policyRepository from "../repositories/policyRepository.js";
import clientRepository from "../repositories/clientRepository.js";

const mapPolicies = (policies) =>
  policies.map(({ id, amountInsured, inceptionDate }) => ({
    id,
    amountInsured,
    inceptionDate,
  }));

const removeClientId = (policies) =>
  policies.map(({ clientId, ...keepAttrs }) => keepAttrs);

const getPolicies = async (user, limit) => {
  const policies = await policyRepository.getAll(user, limit);

  return removeClientId(policies);
};

const getPolicyById = async (user, id, shouldThrow) =>
  policyRepository.getById(user, id, shouldThrow);

const getClients = async (user, limit, name) => {
  const clients = await clientRepository.getAll(user, limit, name);

  return Promise.all(
    clients.map(async (client) => {
      let policies = await policyRepository.getByClientId(user, client.id);
      policies = mapPolicies(policies);

      return {
        ...client,
        policies,
      };
    })
  );
};

const getClientById = async (user, userId, shouldThrow) => {
  const [client] = await clientRepository.getById(user, userId, shouldThrow);
  let policies = await policyRepository.getByClientId(user, client.id);
  policies = mapPolicies(policies);

  return {
    ...client,
    policies,
  };
};

const getClientPolicies = async (user, id) => {
  const policies = await policyRepository.getByClientId(user, id);

  return removeClientId(policies);
};

export {
  getPolicies,
  getClients,
  getPolicyById,
  getClientById,
  getClientPolicies,
};
