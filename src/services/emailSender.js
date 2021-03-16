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

async function newsletterEmailScheduler () {
  const schedule = require('node-schedule')
  const { getAllUsers, sendNewsletterByEmail } = require('./users')

  // Execute a cron job when the hour is 8
  const job = schedule.scheduleJob({ hour: 8 }, async () => {
    console.log('newsletterEmailScheduler sending daily emails')
    const users = await getAllUsers()

    await Promise.all(users.map(async ({ id }) => {
      await sendNewsletterByEmail({ id })
    }))
  })

  return job
}

module.exports = {
  sendEmail,
  newsletterEmailScheduler
}
