const Express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;
const app = Express();

const Contact = require("./models/contact");

mongoose.connect("mongodb://localhost:27017/test3", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("db connected");
    }
})


app.use(body.json());

app.get("/", (req, res) => {
    Contact.find({})
        .then(data => {
            res.status(200).json({ message: "api hit successfully.", data: data });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
})

app.post("/", (req, res) => {
    Contact.create({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    })
        .then(() => {
            res.status(200).json({ message: "stored successfully!" });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
})

app.put("/update/:id", (req, res) => {
    Contact.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    })

        .then(() => {
            res.status(200).json({ message: "updated successfully!" });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
})

app.delete("/delete/:id", (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "delete successfully!" });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
})

app.listen(port, () => {
    console.log(`app is running`)
})