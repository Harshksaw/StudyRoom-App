const mongoose = require("mongoose");

// Define the library schema

//admin -> CreatRoom -> For review -> Approve/Disapprove(Admin) -> Room is live

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  libraryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Library",
  },
  initialPrice: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
    required: false,
  },
  timeSlot: {
    from: { type: String, required: false },
    to: { type: String, required: false },
  },
  roomNo: {
    type: Number,
    required: true,
  },
  bookedSeat: {
    id: { type: String, required: false },
    label: { type: String, required: false },
  },
  bookingDate: {
    type: Date,
    // default: Date.now,
    required: true,
  },
  forFriend:{
    type: {
      name: String,
      email: String,
      phoneNumber: String,
    },
    required: false,
  },
  bookingPeriod: {
    type: Number,
    default: 1,
    required: false,
  },
  transactionDetails: {
    type: {},
    required: false,
  },
  bookingStatus: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "PENDING",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
    required: false,
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  Booking : mongoose.model("Booking", bookingSchema),
};
