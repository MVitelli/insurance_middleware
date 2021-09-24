import AxiosRepository from "./axiosRepository.js";

class PolicyRepository extends AxiosRepository {
  constructor() {
    super("policies");
  }

  async getByClientId(user, clientId, shouldThrow) {
    return this.getByKey(user, clientId, "clientId", shouldThrow);
  }
}

export default new PolicyRepository();
