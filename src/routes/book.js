const express = require("express");
const controller = require("../controllers/BookController");

const router = new express.Router();

router.get("/:id", controller.get);
router.delete("/:id", controller.delete);
router.put("/:id", controller.update);
router.post("/", controller.add);
router.get("/", controller.getAll);

module.exports = router;
