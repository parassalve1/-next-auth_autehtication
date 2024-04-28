
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { resetPasswordTempalte } from './emailTemplates/resetpass';

export async function sendMail(
    {to , subject , body}:{to:string , subject:string , body:string}
) {
    const{SMTP_EMAIL , SMTP_USER , SMTP_PASS} = process.env;
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      });

    try {
        const testResult = await transport.verify();
        console.log('Test of Transport:', testResult);
        
    } catch (error) {
        console.log(error);
    }
    
    try {
        const sendResult = await transport.sendMail({
            from:SMTP_EMAIL,
            to,
            subject,
            html:body
        })

        console.log({sendResult});
        return sendResult;
        
    } catch (error) {
        console.log(error);
        }
}

export function compileResetPassTemplate(name:string , url:string){
    const template = Handlebars.compile(resetPasswordTempalte);
    const htmlBody = template({
        name,
        url,
    })
    return htmlBody;
}