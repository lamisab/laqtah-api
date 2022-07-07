import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {prismaClient} from '../../prisma';
import {Methods, Payment } from '@prisma/client';
const payment = Type.Object({
    payment_id:Type.String(),
    payment_methods:Type.Enum(Methods),
});
export default async function(app:FastifyInstance){
  app.route({
        method:'PUT',
        url:'/create',
        schema:{
            summary:'Create new Payment',
            tags:['Payment'],
            body:payment
        },
        handler: async (request,reply) =>{
            const payment= request.body as Payment;
            let data = {} as any
            if (payment.portress_id!==undefined){
                data = {
                    payment_id:payment.payment_id,
                    payment_methods:payment.payment_methods,
                    
                    User:{
                        connect:{user_id :payment.user_id}
                    },
                     portress:{
                        connect:{portress_id:payment.portress_id}
                    },
                    reservation:{
                        connect:{res_id:payment.res_id}
                     }  
                }

            }else{
                data = {
                    payment_id:payment.payment_id,
                    payment_methods:payment.payment_methods
                }
            }
            await prismaClient.payment.create({
                data: data
            })
        }
    });
}