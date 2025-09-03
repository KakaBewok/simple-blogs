import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// CREATE user
router.post("/", async (req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });
  res.json(result);
});

// GET user by username
router.get("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    where: { username: String(username) },
  });
  res.json(user);
});

export default router;
