import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { search, categoryId } = req.query;
        let where = {};
        if (search) {
            where.name = { contains: search };
        }
        if (categoryId) {
            where.categoryId = categoryId;
        }

        const products = await prisma.product.findMany({ where, include: { category: true } });
        res.status(200).json(products);
    } else if (req.method === "POST") {
        const { name, price, categoryId, stock } = req.body;
        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
                stock: parseInt(stock),
            },
        });
        res.status(201).json(product);
    }

    else if (req.method === "PUT") {
        const { id, name, price, categoryId, stock } = req.body;
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
                stock: parseInt(stock),
            },
        });
        res.status(200).json(product);
    } 
    
    else if (req.method === "DELETE") {
        const { id } = req.query;
        await prisma.product.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
    } 
    
    else {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}