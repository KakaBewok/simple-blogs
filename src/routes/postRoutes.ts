import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// GET all posts (feed)
router.get("/feed", async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  res.json(posts);
});

// GET single post
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});

// CREATE post
router.post("/", async (req: Request, res: Response) => {
  const { content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(result);
});

// UPDATE post
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });
  res.json(post);
});

// DELETE post
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: { id: Number(id) },
  });
  res.json(post);
});

export default router;
