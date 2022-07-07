import { Static, Type } from "@sinclair/typebox";
import { UUID } from "bson";
import { FastifyInstance } from "fastify";
import _ from "lodash";
import { prismaClient } from "../../prisma";
import {User} from '@prisma/client'

const user = Type.Object({
	user_id: Type.String(),
	username: Type.String(),
	phone: Type.String(),
	address: Type.String(),
    email: Type.String({ format: 'email' }),
	role:Type.String(),
});

type user = Static<typeof  user>;
export default async function(app:FastifyInstance){
app.route({
    method: 'PUT',
    url: '/update',
    schema: {
        summary: 'Creates or updates User but all properties are required',
        tags: ['User'],
        body: user,
    },
    handler: async (request, reply) => {
        const customer= request.body as User
        if (!UUID.isValid(customer.user_id)){
            reply.badRequest('user_id should be UUID!');
        } else {
            return await prismaClient.user.upsert({
                where: { user_id: customer.user_id },
                create: customer,
                update: _.omit(customer, ['user_id']),})
            }}
        })
};