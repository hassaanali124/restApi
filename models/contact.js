const mongoose = require("mongoose");
const schema = mongoose.Schema;
// console.log(schema);
const contactSchema = new schema({
    name: {
        type: String
    },
    mobile: {
        type: String,
        match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "It's not a valid mobile number."]
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "It's not an email"],
        unique: true
    }
})

const Contact = mongoose.model("Contactlist", contactSchema)
module.exports = Contact