/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    app = require('../config/app.js');

/*
  Uses Mongoose queries in order to retrieve/add/remove/update listings.
  On an error, sends a 404 status code, as well as the error message. 
  On success (aka no error), sends the listing(s) as JSON in the response.
 */

/* Creates a listing */
exports.create = function(req, res) {

  /* Instantiates a Listing */
  var listing = new Listing(req.body);

  /* saves the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      longitude: req.results.lng,
      latitude: req.results.lat
    };
  }
 
  /* Saves the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(listing);
      console.log(listing)
    }
  });
};

/* Shows the current listing */
exports.read = function(req, res) {
  /* sends back the listing as json from the request */
  res.json(req.listing);
};

/* Updates a listing */
exports.update = function(req, res) {
  var listing = req.listing;

  /* Replaces the listings's properties with the new properties found in req.body */
  listing.code = req.body.code;
  listing.name = req.body.name;

  /*saves the coordinates (located in req.results if there is an address property) */
    if (req.body.address.content != null) {
      listing.address = req.body.address;
      
      if (req.results.content != null) {
        listing.coordinates = {
          longitude: req.results.lng,
          latitude: req.results.lat
        };
      }
    }

    /* Saves the listing */
      listing.save(function (err) {
        if (err) {
          console.log(err);
          res.status(404).send(err);
        } else {
          res.json(listing);
          console.log(listing)
        }
      })

 

};

/* Deletes a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  Listing.findOneAndDelete({_id: listing._id}, function (err, listing) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.status(200);
      res.json(listing);
    }
  })
};

/* Retreives all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res, next) {
  Listing.find({}, function (err, listings) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.status(200);
      res.json(listings);
    }
  })
};

/* 
  Middleware: finds a listing by its ID, then passes it to the next request handler. 

 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(404).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};