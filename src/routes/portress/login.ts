import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import {Which} from '@prisma/client';
import bcrypt from 'bcrypt';
import {login2} from '../../helperfunctions/login2';
import { login1 } from '../../helperfunctions/login1';
const Poretress = Type.Object({
	username: Type.String(),
    password: Type.String(),
});
type Poretress = Static<typeof Poretress>;

const portressCreate = Type.Object({
	username: Type.String(),
    password: Type.String(),
    email: Type.String(),
    url: Type.String(),
    phone: Type.String(),
    image:Type.String(),
    price: Type.String(),
});
type portressCreate = Static<typeof portressCreate>;
export default async function(app:FastifyInstance){
      
	app.route({
        method:'POST',
        url:'/login',
        schema:{
            summary:'login portress return token ',
            tags:['Portress'],
            body:Poretress
        },
        handler: async (request,reply) =>{
            const body= request.body as Poretress;
            const portress = await prismaClient.portress.findFirst({
                where:{
                    username:body.username
                }
            });
            login1(body,portress,reply,app);
        }});
}