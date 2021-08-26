let express = require("express");
let router = express.Router();
router.get("/", function(req, res, next){
  console.log("dd")
  res.json({
    result:true
  })
});
module.exports = router