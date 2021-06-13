const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    phone: {
      type: String,
      minLength: 5,
      maxLength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(5).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().min(5).max(50).required(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
