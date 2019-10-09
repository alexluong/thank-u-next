import { DataSource } from "apollo-datasource"
import Sequelize from "sequelize"
import { subDays } from "date-fns"

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

  async findLastWeekMessages(userId) {
    return this.store.Message.findAll({
      where: {
        userId,
        createdAt: {
          [Sequelize.Op.gte]: subDays(new Date(), 7),
        },
      },
    })
  }
}

export default MessageAPI
