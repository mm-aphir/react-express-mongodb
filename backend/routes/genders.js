const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Gender = require("../models/gender");

router.get("/", (req, res, next) => {
    Gender.find()
      .select("gendername _id")
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
});

router.post("/", (req, res, next) => {
    const gender = new Gender({
      _id: new mongoose.Types.ObjectId(),
      gendername: req.body.gendername,
    });
    gender
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Gender added!!",
          createdProduct: {
            gendername: result.gendername,
            _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/genders/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
});

router.get("/:genderId", (req, res, next) => {
    const id = req.params.genderId;
    Gender.findById(id)
      .select('gendername _id')
      .exec()
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
});

router.delete("/:genderId", (req, res, next) => {
  const id = req.params.genderId;
  Gender.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Gender deleted!!',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;