const express =  require("express");
const {getAllData, createData, getSingleData, updateData, deleteData} = require("../controllers/noteController");

const router = express.Router();

router.route("/").get(getAllData);

router.route("/").post(createData);

router.route("/:id").get(getSingleData);

router.route("/:id").put(updateData);

router.route("/:id").delete(deleteData);


module.exports = router;