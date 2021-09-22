import customAxios from "../utils/customAxios.js";

class AxiosRepository {
  constructor(resource, searchKey = "id", limit = 10) {
    this.resource = resource;
    this.searchKey = searchKey;
    this.limit = limit;
    this.cache = [];
    this.etag = "";
  }

  async data() {
    const response = await customAxios(this.resource, {
      headers: {
        "If-None-Match": this.etag,
      },
    });
    if (response) {
      this.cache = response.data;
      const {
        headers: { etag },
      } = response;
      this.etag = etag;
    }
    return this.cache;
  }

  async getAll(user, limit = this.limit) {
    let data = await this.data();

    if (user.role === "admin") data = limit ? data.slice(0, limit) : data;
    else data = data.filter((element) => element[this.searchKey] === user.id);

    return data;
  }

  async getById(user, id) {
    let data = await this.data();
    data = data.find((element) => element[this.searchKey] === id);

    if (user.role !== "admin")
      data = data.filter((element) => element[this.searchKey] === user.id);

    return data;
  }
}

export default AxiosRepository;
