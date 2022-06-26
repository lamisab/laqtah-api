import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { FastifyReplyType, FastifyRequestType } from 'fastify/types/type-provider';

const data = Type.Object({
    id:Type.String({ format: 'uuid' }),
    username:Type.String(),
    email:Type.String({ format: 'email' })
});
type data = Static<typeof data>;
const GetDataQuery = Type.Object({
	email: Type.Optional(Type.String()),
});
type GetDataQuery = Static<typeof GetDataQuery>;

export default async function(app:FastifyInstance){

 let Data: data [] = [
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', username: 'Lamisab', email: 'lamisabdullah@outlook.com' },
	{ id: '73fd77a5-b235-4f49-8963-97869578db10', username: 'Lamis', email: 'lamistibi77@gmail.com' },
];

 function upsertDataController(datas: any[], newdata: any) {
	const dataIndex = datas.findIndex((el) => el.id === newdata.id);
	if (dataIndex === -1) {
		datas.push(newdata);
	} else {
		newdata[dataIndex] = {
			...datas[dataIndex],
			...newdata,
		};
	}
	return datas;
}

    app.route({
        method:'PUT',
        url:'/acc',
        schema:{
            summary:'insert new account',
            tag:['Lamis'],
            body:data
        },
        handler: async (request: FastifyRequestType,reply:FastifyReplyType) =>{
            const newAccount: any = request.body;
            return upsertDataController(Data, newAccount)
        }
    })
}
