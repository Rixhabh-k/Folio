import nodemailer from "nodemailer"
      
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
})

try {
    await transporter.verify()
    console.log("transporter is ready to send email")
} catch (error) {
    console.error("Transporter failed:", error.message);
}

export async function sendEmail({to,subject,html,text}){
    const details = await transporter.sendMail({
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    })

    console.log("Email sent:", details.messageId);
}