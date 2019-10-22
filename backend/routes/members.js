const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Member = require("../models/member");
const Gender = require("../models/gender");

router.get("/", (req, res, next) => {
    Member.find()
      .select("firstname lastname age sex _id")
      .populate('sex')
      .exec()
      .then(docs => {
        res.status(200).json(docs);
       })
      .catch(err => {
        res.status(500).json({
          error: err
        });
    });
});

router.post("/", (req, res, next) => {
    Gender.findById(req.body.genderId)
      .then(gender => {
        if (!gender) {
          return res.status(404).json({
            message: "Gender not found"
          });
        }
        const member = new Member({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
          sex: req.body.genderId
        });
        return member.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Member added!!!",
          createdMember: {
            _id: result._id,
            firstname: result.firstname,
            lastname: result.lastname,
            age: result.age,
            sex: result.sex
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/members/" + result._id
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

router.get("/:memberId", (req, res, next) => {
    Member.findById(req.params.memberId)
      .populate('gender')
      .exec()
      .then(docs => {
        res.status(200).json(docs);
       })
      .catch(err => {
        res.status(500).json({
          error: err
        });
    });
});

router.delete("/:memberId", (req, res, next) => {
    Member.remove({ _id: req.params.memberId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Member deleted!!",
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
    });
});

module.exports = router;