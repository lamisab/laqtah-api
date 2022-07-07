import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {prismaClient} from '../../prisma';
import {Reservation, Status } from '@prisma/client';

const Reservation = Type.Object({
    total:Type.Integer(),
    event_date:Type.String({format:'date-time'}),
    location:Type.String(),
    res_status:Type.Enum(Status),
    user_id:Type.String(),
});
export default async function(app:FastifyInstance){
  app.route({
        method:'PUT',
        url:'/create',
        schema:{
            summary:'Create new Reservation',
            tags:['Reservation'],
            body:Reservation
        },
        handler: async (request,reply) =>{
            const res= request.body as Reservation;
            await prismaClient.reservation.create({
                data: res
            })
        }
    });
}
