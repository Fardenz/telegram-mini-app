import { Router } from "express"
import jwt from "jsonwebtoken"

const userRoutes = Router();
userRoutes.get("/", (req, res) => {
  res.send("Express + TypeScript Server")
})

userRoutes.post("/auth/login", (req, res) => {
  const { email } = req.body
  try {
    const token = jwt.sign(
      {
        email: email,
        name: "Jon",
        locale: "es",
      },
      "secret"
    )
    res.json({
      jwtToken: token,
    })
  } catch (error) {
    res.status(404)
  }
})

export default userRoutes;