import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import pool from "../config/db"

const SECRET = process.env.JWT_SECRET as string

export const register = async (email: string, password: string) => {

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )

  if (existingUser.rows.length > 0) {
    throw new Error("Usuário já existe")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, hashedPassword]
  )

  return result.rows[0]
}

export const login = async (email: string, password: string) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )

  const user = result.rows[0]

  if (!user) {
    throw new Error("User not found")
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign(
    { userId: user.id },
    SECRET,
    { expiresIn: "1h" }
  )

  return token
}