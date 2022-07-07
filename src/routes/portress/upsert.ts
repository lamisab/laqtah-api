import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { Portress } from '@prisma/client';
import { UUID } from "bson";
import { prismaClient } from "../../prisma";
import _ from "lodash";
const Portress = Type.Object({
    portress_id:Type.String(),
    name: Type.String(),
    email:Type.String({ format: 'email' }),
    phone:Type.String(),
    url:Type.String(),
    image: Type.String(),
    price: Type.String(),
});
export default async function(app:FastifyInstance){
    app.route({
		method: 'PUT',
		url: '/update',
		schema: {
			summary: 'Creates or updates photographer but all properties are required',
			tags: ['Portress'],
			body: Portress,
		},
		handler: async (request, reply) => {
			const portress= request.body as Portress
			if (!UUID.isValid(portress.portress_id)){
				reply.badRequest('portress_id should be an UUID!');
			} else {
				return await prismaClient.portress.upsert({
					where: { portress_id: portress.portress_id },
					create: portress,
					update: _.omit(portress, ['portress_id']),})
                }}
            })
}
