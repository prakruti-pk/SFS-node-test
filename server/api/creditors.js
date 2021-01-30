const router = require("express").Router();
const Creditor = require("../db/models");
const Sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  if (req.query.creditorName) {
    try {
      const creditors = await Creditor.findAll({
        where: {
          creditorName: req.query.creditorName,
        },
      });
      res.json(creditors);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const creditors = await Creditor.findAll();
      const aggregateValues = await Creditor.findOne({
        attributes: [
          [Sequelize.fn("SUM", Sequelize.col("balance")), "totalBalance"],
          [
            Sequelize.fn(
              "ROUND",
              Sequelize.fn("AVG", Sequelize.col("minPaymentPercentage")),
              2
            ),
            "avgPaymentPercentage",
          ],
        ],
        raw: true,
      });
      res.json({ creditors, ...aggregateValues });
    } catch (err) {
      next(err);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const creditor = await Creditor.create(req.body);
    res.json(creditor);
  } catch (err) {
    next(err);
  }
});

router.put("/:creditorId", async (req, res, next) => {
  try {
    const creditorToUpdate = await Creditor.findByPk(req.params.creditorId);
    const update = await creditorToUpdate.update({
      ...creditorToUpdate,
      ...req.body,
    });
    res.json(update);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
