const router = require("express").Router();
const passport = require("passport");
const Car = require("../models/Car.js");

//Function that checks if a user is logged in
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
};

//Gets all cars in the collection and writes the response as JSON for now
router.get("/", (req, res) => {
  Car.find({}, (error, result) => {
    res.json(result);
  });
});

//Gets all cars in the collection with property "available = true", i.e available for rent
router.get("/available", (req, res) => {
  Car.find({"available": true}, (error, result) => {
    if(error) res.send(error);
    res.json(result);
  });
});

//Gets all cars with more than 2 seats
router.get("/familycars", (req, res) => {
  Car.aggregate(
    [
      {
        $match: {
          seats: { $gt: 2}
        }
      }
    ],
    (err, result) => {
      res.json(result);
    });
});

//Gets all cars with less than 3 seats
router.get("/sportscars", (req, res) => {
  Car.aggregate(
    [
      {
        $match: {
          seats: { $lt: 3}
        }
      }
    ],
    (err, result) => {
      res.json(result);
    });
});

//Gets all BMWs in the database
router.get("/bmw", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "BMW"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Gets all Volvos in the database
router.get("/volvo", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "Volvo"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Gets all Audis in the database
router.get("/audi", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "Audi"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Gets all Fords in the database
router.get("/ford", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "Ford"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Gets all Mercedes in the database
router.get("/mercedes", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "Mercedes"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Gets all Renaults in the database
router.get("/renault", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "Renault"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Gets all Mitsubishis in the database
router.get("/mitsubishi", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "Mitsubishi"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Gets all Teslas in the database
router.get("/tesla", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "Tesla"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Gets all Volkswagens in the database
router.get("/volkswagen", (req, res) => {
  Car.aggregate(
    [
      { $match: {brand: "Volkswagen"}}
    ],
    (error, result) => {
      res.json(result);
    });
});

//Renders addcar.pug
router.get("/addcar", (req, res) => {
  res.render("addcar");
});

//------- Routes below this line requires a login to be used -------

//Adds a car to collection
router.post("/addcar", isLoggedIn, (req, res) => {
  let car = new Car(req.body);

  car.save((error, result) => {
    if(error) res.send(error);
    res.json(result);
  });
});

//Updates a car in collection by ID
router.patch("/updatecar/:id", isLoggedIn, (req, res) => {
  Car.findByIdAndUpdate(req.params.id,
    {
      brand: req.body.brand,
      automatic: req.body.automatic,
      seats: req.body.seats,
      roofRack: req.body.roofRack,
      towbar: req.body.towbar,
      pricePerDay: req.body.pricePerDay,
      available: req.body.available
    },
    (error, result) => {
      if(error) res.send(error);
      res.json(result);
    });
});

//Removes a car in collection by ID
router.delete("/removecar/:id", isLoggedIn, (req, res) => {
  Car.findByIdAndRemove(req.params.id, (error, result) => {
    if(error) res.send(error);
    res.send("Car successfully removed from database!");
  });
});

module.exports = router;