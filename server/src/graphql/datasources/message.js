import { DataSource } from "apollo-datasource"

class MessageAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async findMessagesByUser(userId) {
    return this.store.Message.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    })
  }
}

export default MessageAPI
