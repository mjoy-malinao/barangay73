const Profile = require("../models/profiles");
const Program = require("../models/programs");
const Gallery = require("../models/gallery");
const Contact = require("../models/contact");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "Please enter an email that already registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

/*-----------------Profile Page-----------------*/

//Get
exports.get_profiles = async (req, res) => {
  const p = await Profile.find();
  res.render("admin/profiles", {
    profile: p,
    title: "Profiles",
  });
};

//Post
exports.post_profiles = async (req, res, next) => {
  const { name, contact, email, position } = req.body;
  try {
    const profile = new Profile({
      name,
      contact,
      email,
      position,
    });
    const newprofile = await profile.save();
    res.redirect("/admin/profiles");
  } catch (err) {
    res.status(400).json(err);
  }
};
/*-------------------------------------------------*/

/*-----------------Profile Settings Page-----------------*/

//Get ----> Show specific barangay officials
exports.get_settings = (req, res) => {
  Profile.findById(req.params.id, (err, result) => {
    if (!err) {
      res.render("admin/settings", {
        profile_info: result,
        title: "Settings",
      });
    }
  });
};

//Get Update
exports.get_update_settings = (req, res) => {
  res.render("admin/settings", {
    title: "Settings",
  });
};

//Post Update
exports.post_update_settings = (req, res) => {
  Profile.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("/admin/profiles");
      } else {
        console.log("Error during record update :");
      }
    }
  );
};

//Delete
exports.delete_settings = (req, res) => {
  Profile.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/admin/profiles");
    } else {
      console.log("Error in barangay officials delete :" + err);
    }
  });
};

/*-------------------------------------------------*/

/*-----------------Program Page-----------------*/

//Get
exports.get_programs = async (req, res) => {
  const p = await Program.find();
  res.render("admin/programs", {
    program: p,
    title: "Programs",
  });
};

//Post ----> Create new program
exports.post_programs = (req, res, next) => {
  const files = req.files;

  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);

    return (encode_image = img.toString("base64"));
  });

  let result = imgArray.map((src, index) => {
    let finalImg = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
      link: req.body.link,
    };

    let newUpload = new Program(finalImg);

    return newUpload
      .save()
      .then(() => {
        return {
          msg: `${files[index].originalname} Uploaded Successfully...!`,
        };
      })
      .catch((error) => {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            return Promise.reject({
              error: `Duplicate ${files[index].originalname}. File Already exists! `,
            });
          }
          return Promise.reject({
            error:
              error.message ||
              `Cannot Upload ${files[index].originalname} Something Missing!`,
          });
        }
      });
  });

  Promise.all(result)
    .then((msg) => {
      res.redirect("/admin/programs");
    })
    .catch((err) => {
      res.json(err);
    });
};
/*-------------------------------------------------*/

/*-----------------Program Settings Page-----------------*/

//Get ----> Show list of program
exports.get_prog_settings = (req, res) => {
  Program.findById(req.params.id, (err, result) => {
    if (!err) {
      res.render("admin/settings_prog", {
        program_info: result,
        title: "Program Settings",
      });
    }
  });
};

//Get Update
exports.get_prog_update_settings = (req, res) => {
  res.render("admin/settings_prog", {
    title: "Program Settings",
  });
};

//Post Update
exports.post_prog_update_settings = (req, res) => {
  Program.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("/admin/programs");
      } else {
        console.log("Error during record update :");
      }
    }
  );
};

//Delete
exports.prog_delete_settings = (req, res) => {
  Program.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/admin/programs");
    } else {
      console.log("Error in program delete :" + err);
    }
  });
};

/*-------------------------------------------------*/

/*-----------------Gallery Page-----------------*/

//Get
exports.get_gallery = async (req, res) => {
  const g = await Gallery.find();
  res.render("admin/gallery", {
    gallery: g,
    title: "Gallery",
  });
};

//Post ----> Create new image
exports.post_gallery = (req, res, next) => {
  const files = req.files;

  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);

    return (encode_image = img.toString("base64"));
  });

  let result = imgArray.map((src, index) => {
    let finalImg = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
      category: req.body.category,
    };

    let newUpload = new Gallery(finalImg);

    return newUpload
      .save()
      .then(() => {
        return {
          msg: `${files[index].originalname} Uploaded Successfully...!`,
        };
      })
      .catch((error) => {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            return Promise.reject({
              error: `Duplicate ${files[index].originalname}. File Already exists! `,
            });
          }
          return Promise.reject({
            error:
              error.message ||
              `Cannot Upload ${files[index].originalname} Something Missing!`,
          });
        }
      });
  });

  Promise.all(result)
    .then((msg) => {
      res.redirect("/admin/gallery");
    })
    .catch((err) => {
      res.json(err);
    });
};
/*-------------------------------------------------*/

/*-----------------Gallery Settings Page-----------------*/
//Delete
// exports.gallery_delete_settings = (req, res) => {
//   console.log(req.body._id);
//   // Program.findByIdAndRemove(req.body.id, (err, doc) => {
//   //   if (!err) {
//   //     res.redirect("/admin/programs");
//   //   } else {
//   //     console.log("Error in program delete :" + err);
//   //   }
//   // });
// };
// /*-------------------------------------------------*/

/*-----------------Signin & Signup Page-----------------*/

exports.signup_get = (req, res) => {
  res.render("admin/signup", {
    title: "Signup",
  });
};

exports.login_get = (req, res) => {
  res.render("admin/Signin", {
    title: "Signin",
  });
};

exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/admin/login");
};

/*-------------------------------------------------*/

/*-----------------Contact Page-----------------*/

//Get
exports.get_contact = async (req, res) => {
  const c = await Contact.find();
  res.render("admin/contact", {
    contact: c,
    title: "Contact",
  });
};

/*-------------------------------------------------*/

/*-----------------Contact Settings Page-----------------*/

//Get ----> Show specific contact info
exports.get_contact_settings = (req, res) => {
  Contact.findById(req.params.id, (err, result) => {
    if (!err) {
      res.render("admin/contact_sett", {
        contact_info: result,
        title: "Contact",
      });
    }
  });
};

/*-------------------------------------------------*/
