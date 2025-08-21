import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/submit", authMiddleware, async (req: any, res) => {
  try {
    const { name, age, favoriteColor } = req.body;

    const response = await prisma.surveyResponse.create({
      data: { 
        name, 
        age, 
        favoriteColor, 
        userId: req.userId
      },
    });

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save response" });
  }
});

app.get("/review", authMiddleware, async (req: any, res) => {
  try {
    const responses = await prisma.surveyResponse.findMany({
      where: { userId: req.userId },        
      orderBy: { createdAt: "desc" },
    });
    res.json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch responses" });
  }
});

const JWT_SECRET = "supersecretkey";

// Health check
app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function authMiddleware(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/me", authMiddleware, async (req: any, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  res.json(user);
});

app.listen(4000, () => {
  console.log("API running at http://localhost:4000");
});