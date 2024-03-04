import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
})

app.post("/", async (req, res) => {
    let type = req.body["type"];
    let participants = req.body["participants"];
    const url = `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`;
    try {
        const response = await axios.get(url);
        const result = response.data;
        const activityIndex = Math.floor(Math.random() * result.length);
        const activity = result[activityIndex];
        res.render("index.ejs", { data: activity });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: "No activities that match your criteria.",
        });
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})