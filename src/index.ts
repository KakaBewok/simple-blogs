import express, { Request, Response } from "express";
import createError from "http-errors";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
// Mount routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3000`)
);
