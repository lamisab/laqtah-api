import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {prismaClient} from '../../prisma';


const chatWithoutId = Type.Object({
  QA:Type.String(),
});
type chatWithoutId = Static<typeof chatWithoutId>;
export default async function(app:FastifyInstance){
app.route({
    method:'GET',
    url:'/view',
    schema:{
        summary:'view all Chatsupport',
        tags:['Chatsupport'],
        },

        handler:async(request,reply)=>{

            return await prismaClient.reservation.findMany();

        }})}