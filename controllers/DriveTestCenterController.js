const connection = require("../db/connection");
const UserInfo = require("../models/UserModel");
const AppointmentModel = require("../models/AppointmentModel");
const bcrypt = require("bcrypt");
const session = require("express-session");

const controller = {};

/* Page Renders */
controller.index = (req, res) => {
  res.render("index", { title: "Index Page" });
};

controller.login = (req, res) => {
  res.render("login", { title: "Login" });
};

controller.g2 = (req, res) => {
  res.render("g2_page", { title: "G2 Page" });
};

controller.g2_confirmation = (req, res) => {
  res.render("g2_confirmation", { title: "Exam Confirmation" });
};

controller.g = (req, res) => {
  res.render("g_page", { title: "G Page" });
};

/* End Page Renders */

/* Action Methods */

controller.g2_post = async (req, res) => {
  connection();

  const firstName = req.body["txtFirstName"];
  const lastName = req.body["txtLastName"];
  const licenseNumber = req.body["txtLicenseNumber"];
  const Age = parseInt(req.body["txtAge"]);

  const make = req.body["txtMake"];
  const model = req.body["txtModel"];
  const year = parseInt(req.body["txtYear"]);
  const platno = req.body["txtPlatNumber"];
  const slot = req.body["slot"];
  const slotDate = req.body["txtDate"];
  const userName = req.session.user.userName;

  let userFields = {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    licenseNumber: licenseNumber,
    Age: Age,
    carDetail: {
      make: make,
      model: model,
      year: year,
      platno: platno,
    },
    slot: {
      id: slot,
      slotDate: slotDate,
    },
  };
  await G2Register(userFields, res, req);
};

controller.g_page_confirm = async (req, res) => {
  connection();

  const make = req.body["txtMake"];
  const model = req.body["txtModel"];
  const year = parseInt(req.body["txtYear"]);
  const platno = req.body["txtPlatNumber"];
  const userName = req.session.user.userName;

  let userFields = {
    userName: userName,
    carDetail: {
      make: make,
      model: model,
      year: year,
      platno: platno,
    },
  };

  await SearchAndUpdate(userFields, res, req);
};

/* End Action Methods */

/* Functions */

const SearchAndUpdate = async (userFields, res, req) => {
  UserInfo.findOneAndUpdate(
    { userName: userFields.userName },
    {
      carDetail: {
        make: userFields.carDetail.make,
        model: userFields.carDetail.model,
        year: userFields.carDetail.year,
        platno: userFields.carDetail.platno,
      },
    },
    { new: true }
  ).then(function (doc) {
    if (!doc) {
      res.render("g_page", {
        title: "G Page",
        error: "Error updating the information.",
      });
      res.end();
    }

    req.session.user = doc;
    req.session.authorized = true;
    req.session.save();

    res.redirect("g2_confirmation");
    res.end();
  });
};

const G2Register = async (userFields, res, req) => {
  AppointmentModel.findOneAndUpdate(
    { _id: userFields.slot.id },
    {
      IsTimeSlotAvailable: false,
    },
    { returnDocument: "after" }
  ).then(function (doc) {
    if (!doc) {
      res.render("g2_page", {
        title: "G2 Page",
        error: "Error updating the information.",
      });
      res.end();
    }

    UserInfo.findOneAndUpdate(
      { userName: userFields.userName },
      {
        firstName: userFields.firstName,
        lastName: userFields.lastName,
        licenseNumber: userFields.licenseNumber,
        Age: userFields.Age,
        carDetail: {
          make: userFields.carDetail.make,
          model: userFields.carDetail.model,
          year: userFields.carDetail.year,
          platno: userFields.carDetail.platno,
        },
        timeSlot: {
          slotDate: userFields.slot.slotDate,
          slotId: userFields.slot.id,
          slotTime: doc.Time,
        },
      },
      { returnDocument: "after" }
    ).then(function (userDoc) {
      if (!userDoc) {
        res.render("g2_page", {
          title: "G2 Page",
          error: "Error updating the information.",
        });
        res.end();
      }

      req.session.user = userDoc;
      req.session.authorized = true;
      req.session.save();

      res.redirect("/g2_confirmation");
    });
  });
};

/* End Functions */

module.exports = controller;
