const kue = require('kue');
const queue = kue.createQueue();

const job = queue.create('push_notification_code', {
    phoneNumber: '254-703-45678',
    message: 'This is the code to verify your account'
}).save((err) => {
    if (!err) {
        console.log(`Notification job created: ${job.id}`);
    }
});

job.on('completed', () => {
    console.log('Notification job completed');
});

job.on('failed', (err) => {
    console.log('Notification job failed', err);
});
