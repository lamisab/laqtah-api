import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {prismaClient} from '../../prisma';


const chatWithoutId = Type.Object({
  QA:Type.String(),
});
type chatWithoutId = Static<typeof chatWithoutId>;
export default async function(app:FastifyInstance){
  app.route({
        method:'PUT',
        url:'/create',
        schema:{
            summary:'Create new chatsupport',
            tags:['Chatsupport'],
            body:chatWithoutId
        },
        handler: async (request,reply) =>{
            const chatsupport= request.body as chatWithoutId;
            await prismaClient.chatSupport.create({
                data: {...chatsupport}
            })
        }
    });
}
