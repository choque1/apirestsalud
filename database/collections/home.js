const mongoose = require("../connect");
var homeSchema = {
  departamento : String,
  nombre : String,
  zoom : Number,
  lat : String,
  lng : String
};
var home = mongoose.model("home", homeSchema);
module.exports = home;
