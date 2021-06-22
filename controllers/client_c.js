const Profile = require("../models/profiles");
const Program = require("../models/programs");
const Contact = require("../models/contact");

/*-----------------Home Page-----------------*/

//Get
exports.get_home = async (req, res) => {
  const p = await Program.find({});
  res.render("home", {
    program: p,
    title: "Home",
  });
};

/*-------------------------------------------------*/

/*-----------------Profile Page-----------------*/

//Get

exports.get_profile = async (req, res) => {
  const p = await Profile.find({});
  res.render("profile", {
    profile: p,
    title: "Profile",
  });
};

/*-------------------------------------------------*/

/*-----------------Gallery Page-----------------*/

//Get

exports.get_gallery = async (req, res) => {
  const g = await Gallery.find({});
  res.render("gallery", {
    gallery: g,
    title: "Gallery",
  });
};

/*-------------------------------------------------*/

/*-----------------Contact Page-----------------*/

//Get

exports.get_contact = async (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
};

//Post
exports.post_contact = async (req, res, next) => {
  const { name, email, contact, subject, message } = req.body;
  try {
    const con = new Contact({
      name,
      email,
      contact,
      subject,
      message,
    });
    const newprofile = await con.save();
    res.redirect("/barangay73caloocan-contact");
  } catch (err) {
    res.status(400).json(err);
  }
};
/*-------------------------------------------------*/
