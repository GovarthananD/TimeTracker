import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DB } from "./database.js";
import { Time } from "./time_modle.js";
import { Project } from "./project_model.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

DB();

app.get("/", (req, res) => {
    console.log("Hello World");
});

app.post("/addTime", async (req, res) => {
    const taskId = req.body.taskId;
    const startTime = Date.now();
    let newTime = await new Time({taskId,startTime});
    newTime.save();
    res.status(200).send({message:"Time Started", startTime});   
})

app.post("/endTime/:id", async (req, res) => {
    const endId = req.params.id;
    const endTime = new Date();
    try{
        const timer = await Time.findById(endId);
        if(!timer){
            return res.status(404).send({message:"Timer not found"})
        }
        timer.endTime = endTime;
        timer.duration = endTime - timer.startTime;
        const updateTime = await timer.save();
        res.status(400).send(updateTime);
    }catch(error){
        res.status(400).send({message:"Internal server error"});
    }
});

app.post("/addProject", (req, res) => {
    try{
        let newProject = new Project(req.body);
        newProject.save()
        .then((data) => {
            res.status(200).send({message:"Project Added Successfully", data});
        })
        .catch((error) => {
            res.status(500).send({message:"Something error while adding project"})
        })
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
})

app.listen(process.env.PORT, () => console.log("Server Running on PORT", process.env.PORT));
