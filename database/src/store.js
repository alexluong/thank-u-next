const Sequelize = require("sequelize")
const path = require("path")

exports.createStore = function() {
  const db = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", `store.${process.env.NODE_ENV}.sqlite`),
    operatorsAliases: { $in: Sequelize.Op.in },
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
    webhookId: Sequelize.STRING,
  })

  const Whitelist = db.define("whitelist", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    whitelistUserId: Sequelize.STRING,
    whitelistUsername: Sequelize.STRING,
  })

  const Message = db.define("message", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    message: Sequelize.STRING,
    fromUserId: Sequelize.STRING,
    fromUsername: Sequelize.STRING,
  })

  User.hasMany(Whitelist)
  Whitelist.belongsTo(User)
  User.hasMany(Message)
  Message.belongsTo(User)

  return { User, Whitelist, Message }
}
