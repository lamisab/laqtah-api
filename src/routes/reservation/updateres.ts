import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {prismaClient} from '../../prisma';
import {Reservation } from '@prisma/client';
import { UUID } from 'bson';
import _ from 'lodash';

const Reservation = Type.Object({
    res_id:Type.String(),
    total:Type.Integer(),
    event_date:Type.String({format:'date-time'}),
    location:Type.String(),
    res_status:Type.String()
});
export default async function(app:FastifyInstance){
    app.route({
		method: 'PUT',
		url: '/update',
		schema: {
			summary: 'Creates or updates Reservation but all properties are required',
			tags: ['Reservation'],
			body: Reservation,
		},
		handler: async (request, reply) => {
			const reservation= request.body as Reservation
			if (!UUID.isValid(reservation.res_id)){
				reply.badRequest('res_id should be an UUID!');
			} else {
				return await prismaClient.reservation.upsert({
					where: { res_id: reservation.res_id },
					create: reservation,
					update: _.omit(reservation, ['res_id']),
                    
                })
                }}
            })
}
