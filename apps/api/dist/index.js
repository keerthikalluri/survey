"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/submit", authMiddleware, async (req, res) => {
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save response" });
    }
});
app.get("/review", authMiddleware, async (req, res) => {
    try {
        const responses = await prisma.surveyResponse.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: "desc" },
        });
        res.json(responses);
    }
    catch (err) {
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
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: "User already exists" });
    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ error: "Invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(401).json({ error: "No token provided" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid token" });
    }
}
app.get("/me", authMiddleware, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    res.json(user);
});
app.listen(4000, () => {
    console.log("API running at http://localhost:4000");
});
