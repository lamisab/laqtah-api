import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import {Which} from '@prisma/client';
import bcrypt from 'bcrypt';
import {login2} from '../../helperfunctions/login2';
const User = Type.Object({
	username: Type.String(),
    password: Type.String(),
});
type User = Static<typeof User>;

const userCreate = Type.Object({
	username: Type.String(),
    password: Type.String(),
    email: Type.String(),
    address: Type.String(),
    phone: Type.String(),
    role:Type.Enum(Which)
});
type userCreate = Static<typeof userCreate>;
export default async function(app:FastifyInstance){
      
	app.route({
        method:'POST',
        url:'/login',
        schema:{
            summary:'login User return token ',
            tags:['User'],
            body:User
        },
        handler: async (request,reply) =>{
            const body= request.body as User;
            const user = await prismaClient.user.findFirst({
                where:{
                    username:body.username
                }
            });
            login2(body,user,reply,app);
        }});
}