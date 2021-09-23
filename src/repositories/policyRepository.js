import AxiosRepository from "./axiosRepository.js";

class PolicyRepository extends AxiosRepository {
  constructor() {
    super("policies");
  }

  async getByClientId(user, clientId) {
    const policies = await this.getAll(user, 0);
    return policies.filter((policy) => policy.clientId === clientId);
  }
}

export default new PolicyRepository();
