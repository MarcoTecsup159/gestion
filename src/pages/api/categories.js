import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { search } = req.query;
        let where = {};

        if (search) {
            where.name = { contains: search, mode: "insensitive" };
        }

        const categories = await prisma.category.findMany({
            where,
            orderBy: { name: "asc" }
        });
        res.status(200).json(categories);
    } 

    else if (req.method === "POST") {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "El nombre es requerido" });
        }

        const category = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(category);
    }

    else if (req.method === "PUT") {
        const { id, name } = req.body;
        if (!id || !name) {
            return res.status(400).json({ error: "ID y nombre son requeridos" });
        }

        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        res.status(200).json(category);
    }

    else if (req.method === "DELETE") {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" });
        }

        await prisma.category.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).end();
    }

    else {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
