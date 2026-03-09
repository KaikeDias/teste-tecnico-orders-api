import pool from "../config/db"

export const createOrder = async (data: any) => {

  const orderId = data.numeroPedido
  const value = data.valorTotal
  const creationDate = new Date(data.dataCriacao)

  const existingOrder = await pool.query(
    "SELECT order_id FROM orders WHERE order_id = $1",
    [orderId]
  )

  if (existingOrder.rows.length > 0) {
    const error = new Error(`Pedido de numero '${orderId}' já existe`)
      ; (error as any).statusCode = 422
    throw error
  }

  await pool.query(
    "INSERT INTO orders (order_id, value, creation_date) VALUES ($1,$2,$3)",
    [orderId, value, creationDate]
  )

  for (const item of data.items) {

    await pool.query(
      `INSERT INTO items (order_id, product_id, quantity, price)
       VALUES ($1,$2,$3,$4)`,
      [
        orderId,
        Number(item.idItem),
        item.quantidadeItem,
        item.valorItem
      ]
    )
  }

  return { orderId }
}

export const getAll = async () => {
  const result = await pool.query(
    "SELECT * FROM orders ORDER BY creation_date DESC"
  )
  return result.rows
}

export const getById = async (orderId: string) => {
  const result = await pool.query(
    "SELECT * FROM orders WHERE order_id = $1",
    [orderId]
  )

  if (result.rows.length === 0) {
    const error = new Error(`Pedido '${orderId}' não encontrado`)
      ; (error as any).statusCode = 404
    throw error
  }

  const order = result.rows[0]

  const itemsResult = await pool.query(
    "SELECT product_id, quantity, price FROM items WHERE order_id = $1",
    [orderId]
  )

  return {
    ...order,
    items: itemsResult.rows
  }
}

export const update = async (orderId: string, data: any) => {
  const existingOrder = await pool.query(
    "SELECT order_id FROM orders WHERE order_id = $1",
    [orderId]
  )

  if (existingOrder.rows.length === 0) {
    const error = new Error(`Pedido '${orderId}' não encontrado`)
      ; (error as any).statusCode = 404
    throw error
  }

  const value = data.valorTotal

  const updateFields = []
  const updateValues = []
  let paramCount = 1

  if (value !== undefined) {
    updateFields.push(`value = $${paramCount}`)
    updateValues.push(value)
    paramCount++
  }

  if (updateFields.length === 0) {
    return { orderId }
  }

  updateValues.push(orderId)

  await pool.query(
    `UPDATE orders SET ${updateFields.join(", ")} WHERE order_id = $${paramCount}`,
    updateValues
  )

  return { orderId }
}

export const deleteOrder = async (orderId: string) => {
  const existingOrder = await pool.query(
    "SELECT order_id FROM orders WHERE order_id = $1",
    [orderId]
  )

  if (existingOrder.rows.length === 0) {
    const error = new Error(`Pedido '${orderId}' não encontrado`)
      ; (error as any).statusCode = 404
    throw error
  }

  // Deletar items associados primeiro
  await pool.query(
    "DELETE FROM items WHERE order_id = $1",
    [orderId]
  )

  // Deletar order
  await pool.query(
    "DELETE FROM orders WHERE order_id = $1",
    [orderId]
  )

  return { message: `Pedido '${orderId}' deletado com sucesso` }
}