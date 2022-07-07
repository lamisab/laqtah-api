import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {prismaClient} from '../../prisma';
import {Feedback } from '@prisma/client';
const feedback = Type.Object({
    feedback:Type.String(),
    user_id: Type.String({format:'uuid'}),

});
export default async function(app:FastifyInstance){
  app.route({
        method:'PUT',
        url:'/create',
        schema:{
            summary:'Create new Feedback',
            tags:['Feedback'],
            body:feedback
        },
        handler: async (request,reply) =>{
            const feedback= request.body as Feedback;
            await prismaClient.feedback.create({
                data: {feedback :feedback.feedback,
                    User:{
                        connect:{user_id :feedback.user_id}
                    }
                }
            })
        }
    });
}
