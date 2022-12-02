const Router = require("express");
const router = Router();
const controller = require("../controllers/DriveTestCenterController");
const userController = require("../controllers/UserController");
const appointmentController = require("../controllers/AppointmentController");
const authControl = require("../authMiddleware/authMiddleware");

/* Common Routes  */

router.get("/", controller.index);

router.post("/loginIn", authControl.UnauthorizedRoute,  userController.loginIn);

router.get("/login", authControl.UnauthorizedRoute, userController.login);

router.post("/sign_up", authControl.UnauthorizedRoute, userController.sign_up);

/* Driver Routes  */

router.get("/Logout", authControl.requireAuth, userController.Logout);

router.get("/g2_page", authControl.DriverAuth, controller.g2);

router.get("/g2_confirmation", authControl.DriverAuth, controller.g2_confirmation);

router.get("/g_page", authControl.LicenseNumberDefaultRoute, controller.g)

router.post("/g2_page", authControl.DriverAuth, controller.g2_post);

router.post("/g_page_confirm", authControl.DriverAuth,  controller.g_page_confirm);

/* Admin  Routes  */

router.get("/Appointment", authControl.AdminPages, appointmentController.Appointment);

router.post("/SaveAppointmentSlot", authControl.AdminPages, appointmentController.NewSlot);

router.get("/slot_confirmation", authControl.AdminPages, appointmentController.slot_confirmation);

/* Common Auth Routes */

router.post("/GetSlotAvailable", authControl.requireAuth, appointmentController.GetSlotAvailable);

router.post("/GetSlotAvailableForDriver", authControl.requireAuth, appointmentController.GetSlotAvailableForDriver);

module.exports = router;