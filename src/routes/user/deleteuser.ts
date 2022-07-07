import { Static, Type } from "@sinclair/typebox";
import { UUID } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";

const userParams = Type.Object({
    user_id:Type.String(),
})
type userParams=Static<typeof userParams>;
export default async function(app:FastifyInstance){
    app.route({
    method: 'DELETE',
    url: '/:user_id',
    schema: {
        summary: 'Deletes a user',
        tags: ['User'],
        params: userParams,
    },
    handler: async (request, reply) => {
        const { user_id } = request.params as userParams;
        if (!UUID.isValid(user_id)) {
            reply.badRequest('user_id should be UUID!');
            return;
        }
        return prismaClient.user.delete({
            where: { user_id },
        });
    },
});}