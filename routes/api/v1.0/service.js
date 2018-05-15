var express = require('express');
//var multer = require (' multer');
var router = express.Router();

var Home = require("../../../database/collections/home");

router.post("/home", (req, res) => {
  if (req.body.id == "" && req.body.lng == ""){
     res.status(400).json({
        "msn" : "formato incorrecto"
     });
     return;
  }
  var home = {
    id : req.body.id,
    departamento : req.body.departamento,
    nombre : req.body.nombre,
    zoom : req.body.zoom,
    lat : req.body.lat,
    lng : req.body.lng
  };
  var homeData = new Home(home);
  homeData.save().then( () =>{
     res.status(200).json({
        "msn" : "home registradp con exito"
     });
  });
});

router.get("/home", (req, res, next) => {
  Home.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});



























/* GET home page. */
router.post('/imc', function(req, res, next) {
  var imc = Number(req.body.masa) / Math.pow(Number(req.body.altura), 2)
  if (imc < 16) {
    res.send({
      "msn" : "Delgadez severa"
    });
  }else if (imc > 16 && imc  < 16.99){
    res.send({
      "msn" : "Delgadez moderada"
    });
  }else if (imc > 17 && imc  < 18.49){
    res.send({
      "msn" : "Delgadez leve"
    });
  }else if (imc >= 18.5 && imc  <= 24.99){
    res.send({
      "msn" : "Normal"
    });
  }else if (imc >= 25 && imc  <=29.99){
    res.send({
      "msn" : "Sobre peso"
    });
  }else if (imc >= 30 && imc  <= 39.99){
    res.send({
      "msn" : "Obesidad"
    });
  }else if (imc >=40 ){
    res.send({
      "msn" : "Obesidad morbida"
    });
  }else{
    res.send({
      "msn" : "Error en los datos"
    });

  }
//  res.render('index', { title: 'Express' });
});

module.exports = router;
