import type { Request, Response } from "express"
import { login, register } from "../services/authService"

export const loginUser = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body

    const token = await login(email, password)

    res.json({ token })

  } catch (error) {
    res.status(401).json({ message: "Credenciais inválidas" })
  }
}


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await register(email, password)

    res.status(201).json(user)

  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error)

    res.status(400).json({
      message: "Erro ao cadastrar usuário",
      error: error instanceof Error ? error.message : error
    })
  }
}