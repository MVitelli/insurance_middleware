import AxiosRepository from "./axiosRepository.js";

class ClientRepository extends AxiosRepository {
  constructor() {
    super("clients");
  }

  async findUser(username) {
    const users = await super.getAll({ role: "admin" }, 0);
    return users.find((user) => user.name === username);
  }

  async getAll(user, limit = this.limit, name) {
    let clients = await super.getAll(user, limit);
    if (name) clients = clients.filter((client) => client.name === name);
    return clients;
  }
}

export default new ClientRepository();
