import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {prismaClient} from '../../prisma';
import {Feedback } from '@prisma/client';
import { UUID } from 'bson';
const feedback = Type.Object({
    feedback_id: Type.String(),
});
type feedback = Static<typeof feedback>;
export default async function(app:FastifyInstance){
    app.route({
        method: 'DELETE',
        url: '/:feedback_id',
        schema: {
            summary: 'Deletes Feedback',
            tags: ['Feedback'],
            params: feedback,
        },
        handler: async (request, reply) => {
            const { feedback_id } = request.params as Feedback;
            if (!UUID.isValid(feedback_id)) {
                reply.badRequest('feedback_id should be UUID!');
                return;
            }
            return prismaClient.feedback.delete({
                where: { feedback_id },
            });
        },
    });
}