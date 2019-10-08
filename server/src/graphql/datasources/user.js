import { DataSource } from "apollo-datasource"

class UserAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async findUser(id) {
    return this.store.User.findByPk(id)
  }
}

export default UserAPI
