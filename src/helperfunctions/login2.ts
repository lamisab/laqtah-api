import { Static, Type } from "@sinclair/typebox";
import { prismaClient } from "../prisma";
import {User, Which} from '@prisma/client';
import bcrypt from 'bcrypt';
import { FastifyInstance, FastifyReply } from "fastify";

const userCreate = Type.Object({
	username: Type.String(),
    password: Type.String(),
    email: Type.String(),
    address: Type.String(),
    phone: Type.String(),
    role:Type.Enum(Which)
});
type userCreate = Static<typeof userCreate>;

    
export async function login2(body: { username: string; password: string; }, user: User | null,reply:FastifyReply,app:FastifyInstance){

    const isValid = await bcrypt.compareSync(body.password,user?.password??'')
    if (!user){
        const result = await prismaClient.user.create({
            data: { 
                email:userCreate.email,
                username:userCreate.username,
                password:userCreate.password,
                address:userCreate.address,
                phone:userCreate.phone,
                role:userCreate.role,
            },
        });
        const token = app.jwt.sign({
            user_id:result.user_id,
            username: result.username,
            //role: 'admin',

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
            id: user.user_id,
            email: user.email,
            username: user.username,
            password: user.password,
            phone: user.phone,
            role: 'admin',
        });

        return {
            id: user.user_id,
            token,
            type: 'SignIn',
        };
    }
    
}