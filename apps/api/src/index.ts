import express from "express";
import {PrismaClient} from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// simple health check
app.get("/", (req, res) => {
    res.send("Survey API is working...");
})

app.post("/submit", async (req: any, res) => {
    try{
        const {name, age, favoriteColor} = req.body;

        const response = await prisma.surveyResponse.create({
            data: {
                name,
                age,
                favoriteColor,
                userId: req.userId
            },
        });

        res.json(response);
    } catch (err){
        console.error(err);
        res.status(500).json({error: "Failed to save response"});
    }
});

app.get("/review", async (req:any, res) => {
    try{
        const responses = await prisma.surveyResponse.findMany({
            where: { userId: req.userId},
            orderBy: {createdAt: "desc"},
        });
        res.json(responses);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch responses"});
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Survey API is running on port ${PORT}`));