import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import {User, Which} from '@prisma/client';
import _ from 'lodash';
import bcrypt from 'bcrypt';
const saltround=10
const User = Type.Object({
	username: Type.String(),
    password: Type.String(),
	phone: Type.String(),
	address: Type.String(),
    email: Type.String({ format: 'email' }),
    role: Type.Enum(Which)
});


export default async function(app:FastifyInstance){
      
	app.route({
        method:'POST',
        url:'/create',
        schema:{
            summary:'Create new User ',
            tags:['User'],
            body:User
        },
        handler: async (request,reply) =>{
            const user= request.body as any;
            const password=bcrypt.hashSync(user.password,saltround);
            await prismaClient.user.create({
                data:{...user,
                    password:password
                }
                
            })
        }
    });

    };