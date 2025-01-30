import { createClient } from 'redis';
import kue from 'kue';


const client = createClient();
const queue = kue.createQueue({ redis: client });

const blacklistedNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
    job.progress(0, 100);

    if (blacklistedNumbers.includes(phoneNumber)) {
        job.fail(new Error(`Phone number ${phoneNumber} is blacklisted`));
        job.save();
        console.log(`Notification job ${job.id} failed: Phone number ${phoneNumber} is blacklisted`);
        done();
    } else {
        job.progress(50, 100);
        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
        setTimeout(() => {
            job.progress(100, 100);
            console.log(`Notification job ${job.id} completed`);
            done();
        }, 2000);
    }
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});
