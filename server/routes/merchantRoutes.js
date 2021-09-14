const express = require("express");

// controllers
const merchantController = require("../controllers/merchantControllers");

const router = express.Router();

router.get("/doing", merchantController.getMerchants);

module.exports = router;
