'use server';

import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY as string });

type ReqBody = {
    name: string,
    from: string,
    org: string,
    service: string,
    msg: string
}

export async function POST(req: Request, res: Response) {
    try {
        const requestBody = req.body as unknown;

        if (typeof requestBody === 'object' && requestBody !== null) {
            const { name, from, org, service, msg } = requestBody as ReqBody;

            const test = {
                from: from,
                to: 'info@gustavoamaro.com',
                subject: service,
                text: `
                    Name: ${name},
                    Organization: ${org},
                    Message: ${msg}
                `
            }

            const serverRes = await client.messages.create(process.env.MAILGUN_DOMAIN as string, test)
            return Response.json({msg: serverRes.message});
        } else {
            return Response.json({ error: 'Invalid request body' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return Response.json({ error: 'Internal server error' });
    }
}


/*export async function POST(req: Request, res: Response) {

    const {name, from, org, service, msg} = req.body as ReqBody;

    const test = {
        from: '',
        to: 'info@gustavoamaro.com',
        subject: 'Testing',
        text: 'Blabla'
    }

    const serverRes = await client.messages.create(process.env.MAILGUN_DOMAIN as string, test)
    return Response.json({msg: serverRes.message});
}*/