const router = require('express').Router();

const pool = require('../db');
const authorization = require('../middleware/authrization');

router.get("/",authorization,async (req,res) =>{
    try {
        const users = await pool.query("SELECT * FROM users WHERE user_id = $1",[req.user]);
        res.json(users.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
});



module.exports = router;

