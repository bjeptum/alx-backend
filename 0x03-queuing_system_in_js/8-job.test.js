import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', function() {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode = true;
  });

  afterEach(() => {
    queue.testMode = false;
    queue.remove(() => {});
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('invalid', queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', (done) => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'Test message 1' },
      { phoneNumber: '4153518781', message: 'Test message 2' }
    ];

    createPushNotificationsJobs(jobs, queue);

    queue.testMode = true;

    setTimeout(() => {
      const jobsInQueue = queue._queue.length;
      expect(jobsInQueue).to.equal(2);  // We expect 2 jobs to be created
      done();
    }, 100);
  });

  it('should create a single job and verify job data in the queue', (done) => {
    const jobs = [
      { phoneNumber: '4153518743', message: 'Test message 3' }
    ];

    createPushNotificationsJobs(jobs, queue);

    setTimeout(() => {
      const job = queue._queue[0];
      expect(job.data.phoneNumber).to.equal('4153518743');
      expect(job.data.message).to.equal('Test message 3');
      done();
    }, 100);
  });

  it('should handle multiple jobs and ensure no extra jobs are created', (done) => {
    const jobs = [
      { phoneNumber: '4153518744', message: 'Test message 4' },
      { phoneNumber: '4153518745', message: 'Test message 5' }
    ];

    createPushNotificationsJobs(jobs, queue);

    setTimeout(() => {
      const jobsInQueue = queue._queue.length;
      expect(jobsInQueue).to.equal(2);
      done();
    }, 100);
  });
});
