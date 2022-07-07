import { Type,Static } from "@sinclair/typebox";
import { UUID } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";

const reservationParams = Type.Object({
    res_id:Type.String(),
})
type reservationParams=Static<typeof reservationParams>;
export default async function(app:FastifyInstance){
    app.route({
    method: 'DELETE',
    url: '/:res_id',
    schema: {
        summary: 'Deletes a reservation',
        tags: ['Reservation'],
        params: reservationParams,
    },
    handler: async (request, reply) => {
        const { res_id } = request.params as reservationParams;
        if (!UUID.isValid(res_id)) {
            reply.badRequest('res_id should be UUID!');
            return;
        }
        return prismaClient.reservation.delete({
            where: { res_id },
        });
    },
});}