import customAxios from "../utils/customAxios.js";
import ApiError from "../utils/customError.js";

class AxiosRepository {
  constructor(resource, limit = 10) {
    this.resource = resource;
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

  async getById(user, id, shouldThrow = false) {
    let data = await this.data();
    data = data.filter((element) => element.id === id);

    return AxiosRepository.filterByAuthorization(user, data, shouldThrow);
  }

  async getByKey(user, keyValue, keyName, shouldThrow = false) {
    let data = await this.data();
    data = data.filter((element) => element[keyName] === keyValue);

    return AxiosRepository.filterByAuthorization(user, data, shouldThrow);
  }

  static filterByAuthorization(user, data, shouldThrow) {
    let filteredData = data;
    if (!filteredData.length && shouldThrow)
      throw new ApiError(404, 0, "Not found");
    if (user.role !== "admin") {
      filteredData = filteredData.filter((element) => element.id === user.id);
      if (!filteredData.length && shouldThrow)
        throw new ApiError(403, 0, "Forbidden");
    }

    return filteredData;
  }
}

export default AxiosRepository;
