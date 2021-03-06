const Sequelize = require("sequelize")
const path = require("path")

exports.createStore = function() {
  const db = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", `store.${process.env.NODE_ENV}.sqlite`),
    logging: false,
  })

  const User = db.define("user", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: Sequelize.STRING,
    token: Sequelize.STRING,
    secret: Sequelize.STRING,
    isWebhookEnabled: Sequelize.BOOLEAN,
  })

  const Whitelist = db.define("whitelist", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    whitelistUserId: Sequelize.STRING,
    // userId: Sequelize.STRING --> from association
  })

  const Message = db.define("message", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    message: Sequelize.STRING,
    fromUserId: Sequelize.STRING,
    fromUserName: Sequelize.STRING,
    // userId: Sequelize.STRING --> from association
  })

  User.hasMany(Whitelist)
  Whitelist.belongsTo(User)
  User.hasMany(Message)
  Message.belongsTo(User)

  return { User, Whitelist, Message }
}
