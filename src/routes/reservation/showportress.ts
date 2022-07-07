import { Static, Type } from "@sinclair/typebox";
import { UUID } from "bson";
import { FastifyInstance } from "fastify/types/instance";
import { prismaClient } from "../../prisma";
import { Portress} from '@prisma/client';
const Portress = Type.Object({
    portress_id:Type.String(),
    name: Type.String(),
    email:Type.String({ format: 'email' }),
    phone:Type.String(),
    url:Type.String(),
    image: Type.String(),
    price: Type.String(),});
const portressParams = Type.Object({
    portress_id:Type.String(),
})
type portressParams=Static<typeof portressParams>;

export default async function(app:FastifyInstance){
app.route({
    method: 'GET',
    url: '/:portress_id',
    schema: {
        summary: 'Returns one Photographer or null',
        tags: ['Reservation'],
        params: portressParams,
        response: {
            '2xx': Type.Union([Portress, Type.Null()]),
        },
    },handler: async (request, reply) => {
        const { portress_id } = request.params as portressParams;
        if (!UUID.isValid(portress_id)) {
            reply.badRequest('portress_id should be UUID!');
            return;
        }
        return prismaClient.portress.findFirst({
            where: { portress_id },
        });
    },
})}