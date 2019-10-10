var nodemailer = require('nodemailer');

const transport = (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "omegaprime2008@gmail.com",
            pass: "20081998"
        }
    })
    const mailOptions = {
        from: "omegaprime2008@gmail.com",
        to: "natsu1504@gmail.com",
        subject: "test send email",
        text: "đm cx khoai đấy"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("email sent successfully");
        }
    });
};

module.exports.transport = transport;




