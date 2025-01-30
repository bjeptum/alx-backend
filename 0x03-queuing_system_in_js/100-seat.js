import express from 'express';
import { createClient } from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const app = express();
const port = 1245;

const redisClient = createClient();
redisClient.connect().catch(console.error);

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const queue = kue.createQueue();

const initialSeats = 50;
let reservationEnabled = true;

async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats) || 0;
}

async function initializeSeats() {
  await reserveSeat(initialSeats);
}
initializeSeats();

app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats.toString() });
});

app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservations are blocked' });
  }

  const job = queue.create('reserve_seat', {})
    .save((err) => {
      if (err) {
        return res.json({ status: 'Reservation failed' });
      }
      res.json({ status: 'Reservation in process' });
    });
});

app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  const job = queue.process('reserve_seat', async (job, done) => {
    const availableSeats = await getCurrentAvailableSeats();

    if (availableSeats <= 0) {
      reservationEnabled = false;
      return done(new Error('Not enough seats available'));
    }

    const updatedSeats = availableSeats - 1;
    await reserveSeat(updatedSeats);

    if (updatedSeats === 0) {
      reservationEnabled = false;
    }

    console.log(`Seat reservation job ${job.id} completed`);
    done();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
