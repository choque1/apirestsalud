var express = require('express');
//var multer = require (' multer');
var router = express.Router();

var Home = require("../../../database/collections/home");

router.post("/home", (req, res) => {
  if (req.body.departamento == "" && req.body.lng == ""){
     res.status(400).json({
        "msn" : "formato incorrecto"
     });
     return;
  }
  var home = {
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
//ver todas las casas registradas
router.get("/home", (req, res, next) => {
  Home.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
//ver solo una casa mediante el id
router.get(/home\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Home.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null){
      res.status(200).json(docs);
      return;
    }

    res.status(200).json({
      "msn" : "No existe la casa"
    });
  });
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
