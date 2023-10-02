import { Router } from "express"

const userRoutes = Router();
userRoutes.get("/", (req, res) => {
  res.send("Express + TypeScript Server")
})

export default userRoutes;