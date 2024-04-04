const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shoppingCartModel");

router.get('/getOneWay/:userId', async (req, res) => {

    try {
        const user = await shoppingCart.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).send("User with userId does not exist.");
        } else {
            const crOneWay = user.crOneWay;
            return res.json(crOneWay);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;