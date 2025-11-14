const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/message", (req, res)=>{
    console.log("Backend: received request");

    res.json({
        status: "success",
        message: "Hello from the backend!"
    });
});


app.post("/adduser", (req, res)=> {
    console.log("Backend: backend received the post request");
    console.log("we recived: req.body");
})



app.listen(5000, ()=> {
    console.log("Backend running on port 5000");
});