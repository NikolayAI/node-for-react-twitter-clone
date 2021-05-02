import { transport as mailer } from '../core';
import { SentMessageInfo } from 'nodemailer';


interface ISendEmail {
  emailFrom: string,
  emailTo: string,
  subject: string,
  html: string,
}

export const sendEmail = (
  {
    emailFrom,
    emailTo,
    subject,
    html,
  }: ISendEmail,
  callback?: (err: Error | null, info: SentMessageInfo) => void,
) => {
  mailer.sendMail(
    {
      from: emailFrom,
      to: emailTo,
      subject,
      html,
    },
    callback || function (err: Error | null, info: SentMessageInfo) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    },
  );
};