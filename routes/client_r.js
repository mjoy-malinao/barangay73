const express = require("express");
const router = express.Router();
const client = require("../controllers/client_c");

/*-----------------Home Page-----------------*/
router.get("/barangay73caloocan-official-website", client.get_home);

/*-------------------------------------------------*/

/*-----------------Profile Page-----------------*/
router.get("/barangay73caloocan-barangay-officials", client.get_profile);

//router.post("/admin/profiles", store.array("images", 12), admin.post_profiles);
/*-------------------------------------------------*/

/*-----------------Gallery Page-----------------*/
router.get("/barangay73caloocan-gallery", client.get_gallery);
/*-------------------------------------------------*/

/*-----------------Contact Page-----------------*/
router.get("/barangay73caloocan-contact", client.get_contact);
router.post("/barangay73caloocan-contact", client.post_contact);
/*-------------------------------------------------*/

module.exports = router;
