import Mailgen from "mailgen";
import nodemailer from "nodemailer";



const SendEmail= async (options) => {
    const MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com"
        }
    })

    const emailTexual = MailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = MailGenerator.generate(options.mailgenContent)


    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTexual,
        html: emailHtml
    }


    try{
        await transporter.sendMail(mail)
    }catch(error){
        console.error("Email service failed silently. Make sure that you have provided your MAILTRAP credentials in the .env file")
        console.error("Error", error)
    }
}

const emailverification = (username, EmailVerificationURL) =>{
return{
    body:{
        name: username,
        intro: "Welcome to our app we are excited to have you on board.",
        action: {
            instructions: "To verify your enail please click on the following button",
            button: {
                color: "#22BC66",
                text: "Verify your E-mail",
                link: EmailVerificationURL
            },
        },
        outro: "Need help, or have questions? Feel free to reply to this email, we'd love to help you.",
    },
};
};


const resetpassword = (username, PasswordResetURL) =>{
return{
    body:{
        name: username,
        intro: "Welcome to our app we are excited to have you on board.",
        action: {
            instructions: "To reset your password please click on the following button",
            button: {
                color: "#22BC66",
                text: "Reset your Password",
                link: PasswordResetURL
            },
        },
        outro: "Need help, or have questions? Feel free to reply to this email, we'd love to help you.",
    },
};
};


export{emailverification, resetpassword, SendEmail};