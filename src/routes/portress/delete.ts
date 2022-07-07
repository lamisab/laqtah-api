import { Static, Type } from "@sinclair/typebox";
import { UUID } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";

const portressParams = Type.Object({
    portress_id:Type.String(),
})
type portressParams=Static<typeof portressParams>;
export default async function(app:FastifyInstance){
    app.route({
    method: 'DELETE',
    url: '/:portress_id',
    schema: {
        summary: 'Deletes a photographer',
        tags: ['Portress'],
        params: portressParams,
    },
    handler: async (request, reply) => {
        const { portress_id } = request.params as portressParams;
        if (!UUID.isValid(portress_id)) {
            reply.badRequest('portress_id should be UUID!');
            return;
        }
        return prismaClient.portress.delete({
            where: { portress_id },
        });
    },
});}