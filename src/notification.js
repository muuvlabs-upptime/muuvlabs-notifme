const NotifmeSdk = require('notifme-sdk');

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_TO,
} = process.env;

const notifmeSdk = new NotifmeSdk.default({
  channels: {
    email: {
      providers: [{
        type: 'smtp',
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      }]
    }
  }
});

const SERVICE_NAME = 'Test Service';

notifmeSdk.send({
  email: {
    from: SMTP_FROM,
    to: SMTP_TO,
    subject: `[!] Upptime notification: ${SERVICE_NAME} service down`,
    html: `<b>Service down since</b>`
  }
}).then(console.log);