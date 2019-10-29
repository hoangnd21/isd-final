var nodemailer = require('nodemailer');

const transport = (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: req.body.email,
            pass: req.body.password
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: req.body.userEmail,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("email sent successfully!");
        }
    });
};

module.exports.transport = transport;




