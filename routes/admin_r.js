const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin_c");
const store = require("../middleware/multer");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

/*-----------------Home Page-----------------*/
router.get("/admin/news", checkUser, requireAuth, admin.get_news);
router.post(
  "/admin/news",
  checkUser,
  requireAuth,
  store.array("images", 12),
  admin.post_news
);

router.get("/admin/news/delete/:id", checkUser, requireAuth, admin.delete_news);

/*-------------------------------------------------*/

/*-----------------Profile Page-----------------*/
router.get("/admin/profiles", checkUser, requireAuth, admin.get_profiles);
router.post("/admin/profiles", checkUser, requireAuth, admin.post_profiles);
/*-------------------------------------------------*/

/*-----------------Profile Settings Page-----------------*/
router.get(
  "/admin/profiles/settings/:id",
  checkUser,
  requireAuth,
  admin.get_settings
);

router.get(
  "/admin/profiles/settings",
  checkUser,
  requireAuth,
  admin.get_update_settings
);
router.post(
  "/admin/profiles/settings",
  checkUser,
  requireAuth,
  admin.post_update_settings
);

router.get(
  "/admin/profiles/settings/delete/:id",
  checkUser,
  requireAuth,
  admin.delete_settings
);
/*-------------------------------------------------*/

/*-----------------Program Page-----------------*/
router.get("/admin/programs", checkUser, requireAuth, admin.get_programs);
router.post(
  "/admin/programs",
  checkUser,
  requireAuth,
  store.array("images", 12),
  admin.post_programs
);
/*-------------------------------------------------*/

/*-----------------Program Settings Page-----------------*/
router.get(
  "/admin/programs/settings/:id",
  checkUser,
  requireAuth,
  admin.get_prog_settings
);

router.get(
  "/admin/programs/settings/delete/:id",
  checkUser,
  requireAuth,
  admin.prog_delete_settings
);
/*-------------------------------------------------*/

/*-----------------Gallery Page-----------------*/
router.get("/admin/gallery", checkUser, requireAuth, admin.get_gallery);
router.post(
  "/admin/gallery",
  checkUser,
  requireAuth,
  store.array("images", 12),
  admin.post_gallery
);
/*-------------------------------------------------*/

/*-----------------Gallery Settings Page-----------------*/

router.get(
  "/admin/gallery/delete/:id",
  checkUser,
  requireAuth,
  admin.gallery_delete_settings
);
/*-------------------------------------------------*/

/*-----------------Contact Page-----------------*/
router.get("/admin/contact", checkUser, requireAuth, admin.get_contact);
/*-------------------------------------------------*/

/*-----------------Contact Settings Page-----------------*/
router.get(
  "/admin/contact/settings/:id",
  checkUser,
  requireAuth,
  admin.get_contact_settings
);
/*-------------------------------------------------*/

/*-----------------Signup Page-----------------*/
router.get("/admin/signup", checkUser, requireAuth, admin.signup_get);
router.post("/admin/signup", checkUser, requireAuth, admin.signup_post);
/*-------------------------------------------------*/

/*-----------------Signin Page-----------------*/
router.get("/admin/login", admin.login_get);
router.post("/admin/login", admin.login_post);
/*-------------------------------------------------*/

router.get("/admin/logout", checkUser, requireAuth, admin.logout_get);

module.exports = router;
