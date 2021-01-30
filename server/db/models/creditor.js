const Sequelize = require("sequelize");
const db = require("../db");

const Creditor = db.define("creditor", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  creditorName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  minPaymentPercentage: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    get() {
      // Workaround until sequelize issue #8019 is fixed
      const value = this.getDataValue('minPaymentPercentage');
      return value === null ? null : parseFloat(value);
    }
  },
  balance: {
    type: Sequelize.DECIMAL(1000,2),
    allowNull: false,
    get() {
      // Workaround until sequelize issue #8019 is fixed
      const value = this.getDataValue('balance');
      return value === null ? null : parseFloat(value);
    }
  },
});

module.exports = Creditor;
