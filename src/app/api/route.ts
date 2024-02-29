'use server';

import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY as string });

const test = {
    from: 'gumarinho09@gmail.com',
    to: 'info@gustavoamaro.com',
    subject: 'Testing',
    text: 'Blabla'
}

export async function POST(req: Request, res: Response) {
    client.messages.create(process.env.MAILGUN_DOMAIN as string, test).then(res => console.log(res)).catch(err => console.log(err));
}