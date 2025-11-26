import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(todoRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
