'use strict'

function sendEmail ({
  from = 'critimass@gmail.com',
  to,
  subject = 'Daily Reddit newsletter',
  text,
  html
}) {
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to,
    from,
    subject,
    text,
    html
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      return true
    })
    .catch((error) => {
      console.error('Error sending email:', error)
      return false
    })
}

module.exports = {
  sendEmail
}
