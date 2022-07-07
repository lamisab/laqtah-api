import { Static, Type } from "@sinclair/typebox";
import { prismaClient } from "../prisma";
import {Portress, Which} from '@prisma/client';
import bcrypt from 'bcrypt';
import { FastifyInstance, FastifyReply } from "fastify";

const portressCreate = Type.Object({
    username:Type.String(),
    password:Type.String(),
    email:Type.String(),       
    phone:Type.String(),
    url:Type.String(),
    image:Type.String(),
    price:Type.String(),
});
type portressCreate = Static<typeof portressCreate>;

    
export async function login1(body: { username: string; password: string; }, portress: Portress | null,reply:FastifyReply,app:FastifyInstance){

    const isValid = await bcrypt.compareSync(body.password,portress?.password??'')
    if (!portress){
        const result = await prismaClient.user.create({
            data: { 
                email:portressCreate.email,
                username:portressCreate.username,
                password:portressCreate.password,
                address:portressCreate.address,
                phone:portressCreate.phone,
                role:portressCreate.role,
            },
        });
        const token = app.jwt.sign({
            user_id:result.user_id,
            username: result.username,

        });
        return {
            id: result.user_id,
            token,
            type: 'SignUp',
        }; 
    } else {
        if (!isValid) {
            reply.unauthorized();
            return;
        }    
        
        const token = app.jwt.sign({
            id: portress.portress_id,
            email: portress.email,
            username: portress.username,
            password: portress.password,
            phone: portress.phone,
            role: 'admin',
        });

        return {
            id: portress.portress_id,
            token,
            type: 'SignIn',
        };
    }
    
}