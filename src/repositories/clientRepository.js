import AxiosRepository from "./axiosRepository.js";

class ClientRepository extends AxiosRepository {
  constructor() {
    super("clients");
  }

  async data() {
    if (!this.cache.length)
      this.cache = await super.getAll({ role: "admin" }, 0);
    return this.cache;
  }

  async findUser(username) {
    const users = await this.data();
    return users.find((user) => user.name === username);
  }
}

export default new ClientRepository();
