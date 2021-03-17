'use strict'

function sendEmail ({
  from = 'critimass@gmail.com',
  to,
  subject = 'Daily Reddit newsletter',
  text,
  html
} = {}) {
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
      console.log('Email sent to', to)
      return true
    })
    .catch((error) => {
      console.error('Error sending email:', error)
      throw Error('Error sending email:', error)
    })
}

/**
 *
 * @param {numer} second (0-59)
 * @param {numer} minute (0-59)
 * @param {numer} hour (0-23)
 * @param {numer} date (1-31)
 * @param {numer} month (0-11)
 * @param {numer} year
 * @param {numer} dayOfWeek (0-6) Starting with Sunday
 */
async function newsletterEmailScheduler ({
  second = 0,
  minute = 0,
  hour = 8,
  date,
  month,
  year,
  dayOfWeek
} = {}) {
  const schedule = require('node-schedule')
  const { getAllUsers, sendNewsletterByEmail } = require('./users')

  // Default: Execute a cron job when the hour is 8:00:00
  const job = schedule.scheduleJob(
    { hour, minute, second },
    async () => {
      console.log('newsletterEmailScheduler sending daily emails')
      const users = await getAllUsers()

      await Promise.all(
        users.map(async ({ id, sendNewsletter }) => {
          try {
            if (sendNewsletter) {
              await sendNewsletterByEmail({ id })
            }
          } catch (err) {
            console.error('Error newsletterEmailScheduler:', err.message)
          }
        })
      )
    }
  )

  return job
}

module.exports = {
  sendEmail,
  newsletterEmailScheduler
}
