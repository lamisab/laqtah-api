import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { Portress } from '@prisma/client';
import { prismaClient } from "../../prisma";
import Fuse from "fuse.js";
import { addAuthorization } from '../../hooks/auth';


const Portress = Type.Object({
	username: Type.String(),
    password: Type.String(),
    email: Type.String(),
    url: Type.String(),
    phone: Type.String(),
    image:Type.String(),
    price: Type.String(),
});
const GetportressQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
type GetportressQuery = Static<typeof GetportressQuery>;
export default async function (server: FastifyInstance) {
    addAuthorization(server);

server.route({
    method: 'GET',
    url: '/portress',
    schema: {
        summary: 'Gets all photographers',
        tags: ['Portress'],
        querystring: GetportressQuery,
        response: {
            '2xx': Type.Array(Portress),
        },
    },
    handler: async (request, reply) => {
        const query = request.query as GetportressQuery;

        const portress = await prismaClient.portress.findMany();
        if (!query.text) return portress;

        const fuse = new Fuse(portress, {
            includeScore: true,
            isCaseSensitive: false,
            keys: ['username'],
        });


        const result: Portress[] = fuse.search(query.text).map((c:any) => c.item);
        return result;
    },
});}