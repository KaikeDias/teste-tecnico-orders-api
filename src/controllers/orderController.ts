import { Request, Response } from "express"
import * as orderService from "../services/orderService"

export const createOrder = async (req: Request, res: Response) => {

  try {

    const order = await orderService.createOrder(req.body)

    res.status(201).json({
      message: "Pedido criado",
      order
    })

  } catch (error) {

    console.error(error)

    const statusCode = (error as any).statusCode || 500
    const message = (error as any).message || "Erro ao criar pedido"

    res.status(statusCode).json({
      message
    })

  }

}

export const getAll = async (req: Request, res: Response) => {

  try {

    const orders = await orderService.getAll()

    res.status(200).json({
      message: "Pedidos encontrados",
      orders
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: "Erro ao buscar pedidos"
    })

  }

}

export const getById = async (req: Request, res: Response) => {

  try {

    const orderId = req.params.orderId as string
    const order = await orderService.getById(orderId)

    res.status(200).json({
      order
    })

  } catch (error) {

    console.error(error)

    const statusCode = (error as any).statusCode || 500
    const message = (error as any).message || "Erro ao buscar pedido"

    res.status(statusCode).json({
      message
    })

  }

}

export const updateOrder = async (req: Request, res: Response) => {

  try {

    const orderId = req.params.orderId as string
    const result = await orderService.update(orderId, req.body)

    res.status(200).json({
      result
    })

  } catch (error) {

    console.error(error)

    const statusCode = (error as any).statusCode || 500
    const message = (error as any).message || "Erro ao atualizar pedido"

    res.status(statusCode).json({
      message
    })

  }

}

export const deleteOrder = async (req: Request, res: Response) => {

  try {

    const orderId = req.params.orderId as string
    const result = await orderService.deleteOrder(orderId)

    res.status(200).json(result)

  } catch (error) {

    console.error(error)

    const statusCode = (error as any).statusCode || 500
    const message = (error as any).message || "Erro ao deletar pedido"

    res.status(statusCode).json({
      message
    })

  }

}