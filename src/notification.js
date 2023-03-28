const NotifmeSdk = require( "notifme-sdk" );

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_TO,
    STATUS_FILE_PATH,
} = process.env;

console.log( `Sending emails as ${SMTP_USER}` );

const notifmeSdk = new NotifmeSdk.default({
  channels: {
    email: {
      providers: [{
        type: "smtp",
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE === "true",
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      }]
    }
  }
});

const serviceStatuses = require(STATUS_FILE_PATH);

for (const status of serviceStatuses) {
    if (status.status !== "up") {
        notifmeSdk.send({
            email: {
                from: SMTP_FROM,
                to: SMTP_TO,
                subject: `[!] Upptime notification: ${status.name} service down`,
                html: `<b>Service down: ${status.url}</b><br>Downtime: <br>${JSON.stringify(status.dailyMinutesDown, null, 2)}`
            }
        }).then(console.log);
    }
}
