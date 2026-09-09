import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes, { seedAdmin } from "./routes/auth.js";
import solutionRoutes from "./routes/solutions.js";
import insightRoutes from "./routes/insights.js";
import contactRoutes from "./routes/contacts.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/contact", contactRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

// Seed admin user before listening (non-blocking)
seedAdmin();

app.listen(PORT, () => {
  console.log(`BelTech backend running on port ${PORT}`);
});
