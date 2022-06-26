import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';

const User = Type.Object({
	id: Type.String({ format: 'uuid' }),
	name: Type.String(),
	username: Type.String(),
    password: Type.String({ format: 'password' }),
    email: Type.String({ format: 'email' }),
});
type User = Static<typeof User>;

const GetUserQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetUserQuery = Static<typeof GetUserQuery>;

export let info: User[] = [
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Lamis',
     username: 'lamisab', password: 'lamis123456',email: 'lamisab@gmail.com'}
];


export default async function(app:FastifyInstance){
       app.route({
           method:'PUT',
           url:'/acc',
           schema:{
               summary:'insert new account',
               tag:['Account'],
               body:User
           },
           handler: async (request,reply) =>{
               const newAccount: any = request.body;
			   newAccount.push(User)
               return newAccount;
           }
       }),

       app.route({
		method: 'PATCH',
		url: '/acc/:id',
		schema: {
			summary: 'Update user by id + you dont need to pass all properties',
			tags: ['Account'],
			body: Type.Partial(User),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newAccount: any = request.body;
			newAccount.push(User)
			return newAccount;
		}
		})
	};