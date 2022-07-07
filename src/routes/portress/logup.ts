import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {prismaClient} from '../../prisma';
import bcrypt from 'bcrypt';
const saltround=10
const portressWithoutId = Type.Object({
    name: Type.String(),
    email:Type.String({ format: 'email' }),
    password: Type.String({format: 'password'}),
    phone:Type.String(),
    url:Type.String(),
    image: Type.String(),
    price: Type.String(),
});
type portressWithoutId = Static<typeof portressWithoutId>;
export default async function(app:FastifyInstance){
  app.route({
        method:'PUT',
        url:'/create',
        schema:{
            summary:'Create new Photographer',
            tags:['Portress'],
            body:portressWithoutId
        },
        handler: async (request,reply) =>{
            const portress= request.body as any;
            const password=bcrypt.hashSync(portress.password,saltround);
            await prismaClient.portress.create({
                data:{...portress,
                    password:password
                }
                
            })
        }
    });
}
