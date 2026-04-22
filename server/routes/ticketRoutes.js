const express = require("express");

const {
  createTicket,
  updateTicketStatus,
  getTicketById,
  getTickets,
} = require("../controllers/ticketController");

const protect = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/verifyRole");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getTickets)
  .post(verifyRole("student", "staff", "admin"), createTicket);

router.route("/:id").get(getTicketById);

router
  .route("/:id/status")
  .patch(verifyRole("admin", "staff"), updateTicketStatus)
  .put(verifyRole("admin", "staff"), updateTicketStatus);

// Allow PUT on main endpoint for convenience
router
  .route("/:id")
  .put(verifyRole("admin", "staff"), updateTicketStatus);

module.exports = router;
