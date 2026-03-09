import { Router } from "express"
import * as orderController from "../controllers/orderController"

const router = Router()
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar um novo pedido
 *     tags:
 *       - Orders
 *     description: Cria um novo pedido e realiza o mapeamento dos campos antes de salvar no banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: v10089015vdb-01
 *               valorTotal:
 *                 type: number
 *                 example: 10000
 *               dataCriacao:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-07-19T12:24:11.5299601+00:00
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                       example: "2434"
 *                     quantidadeItem:
 *                       type: number
 *                       example: 1
 *                     valorItem:
 *                       type: number
 *                       example: 1000
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/order", orderController.createOrder)

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags:
 *       - Orders
 *     description: Retorna uma lista de todos os pedidos ordenada pela data de criação (mais recentes primeiro).
 *     responses:
 *       200:
 *         description: Lista de pedidos encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedidos encontrados
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/order", orderController.getAll)

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags:
 *       - Orders
 *     description: Retorna um pedido específico com todos os seus itens.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido (numeroPedido)
 *         example: v10089015vdb-01
 *     responses:
 *       200:
 *         description: Pedido encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedido encontrado
 *                 order:
 *                   type: object
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/order/:orderId", orderController.getById)

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Atualizar pedido
 *     tags:
 *       - Orders
 *     description: Atualiza os dados de um pedido existente (valor total e/ou data de criação).
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido (numeroPedido)
 *         example: v10089015vdb-01
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *                 example: 15000
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/order/:orderId", orderController.updateOrder)

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Deletar pedido
 *     tags:
 *       - Orders
 *     description: Deleta um pedido e todos os seus itens associados.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido (numeroPedido)
 *         example: v10089015vdb-01
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/order/:orderId", orderController.deleteOrder)

export default router