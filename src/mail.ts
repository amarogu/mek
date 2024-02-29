import "dotenv/config";

interface Email {
    name: string;
    email: string;
    org: string;
    service: string;
    msg: string;
}

export async function sendMail({name, email, org, service, msg} : Email) {
    
}