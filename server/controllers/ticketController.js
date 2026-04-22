const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const { title, description, category, priority, roomNumber } = req.body;

    if (!title || !description || !category || !roomNumber) {
      return res.status(400).json({
        status: "fail",
        message: "Title, description, category, and room number are required.",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority: priority || "low",
      roomNumber,
      createdBy: req.user._id,
    });

    res.status(201).json({ status: "success", data: { ticket } });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getTickets = async (req, res) => {
  try {
    // 1. Base Query: If user is a student, ONLY show their tickets.
    let queryObj = {};
    if (req.user.role === "student") {
      queryObj.createdBy = req.user._id;
    }

    // 2. Query Filters: Allow filtering by status or priority (e.g., ?status=open)
    if (req.query.status) queryObj.status = req.query.status;
    if (req.query.priority) queryObj.priority = req.query.priority;

    // Fetch tickets and populate the creator's name and email
    const tickets = await Ticket.find(queryObj)
      .populate("createdBy", "name email")
      .sort("-createdAt"); // Newest first

    res
      .status(200)
      .json({ status: "success", count: tickets.length, data: { tickets } });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!ticket) {
      return res
        .status(404)
        .json({ status: "fail", message: "Ticket not found." });
    }

    // RBAC: If student, ensure they own this ticket
    if (
      req.user.role === "student" &&
      ticket.createdBy._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        status: "fail",
        message: "Not authorized to view this ticket.",
      });
    }

    res.status(200).json({ status: "success", data: { ticket } });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate enum
    const validStatuses = ["open", "in-progress", "resolved"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid status value." });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    ).populate("createdBy", "name email");

    if (!ticket) {
      return res
        .status(404)
        .json({ status: "fail", message: "Ticket not found." });
    }

    res.status(200).json({ status: "success", data: { ticket } });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
};
