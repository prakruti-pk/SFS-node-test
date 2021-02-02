const router = require("express").Router();
const Creditor = require("../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res, next) => {
  try {
    const data = await Creditor.findAll({
      where: {
        [Op.and]: [
          { balance: { [Op.gt]: 2000.0 } },
          {
            minPaymentPercentage: { [Op.lte]: 2.99 },
          },
        ],
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
