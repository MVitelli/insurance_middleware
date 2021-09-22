import AxiosRepository from "./axiosRepository.js";

class PolicyRepository extends AxiosRepository {
  constructor() {
    super("policies", "clientId");
  }
}

export default new PolicyRepository();
