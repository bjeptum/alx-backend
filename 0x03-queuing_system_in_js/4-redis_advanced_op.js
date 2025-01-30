import { createClient, print } from 'redis';

const client = createClient();

client.connect();

client.on('connect', () => console.log('Redis client connected to the server'));
client.on('error', (err) => console.log('Redis client not connected to the server: Error', err));

function clearExistingKey() {
    client.DEL('ALX')
}

function createHash() {
    client.HSET('ALX', 'Portland', 50, print);
    client.HSET('ALX', 'Seattle', 80, print);
    client.HSET('ALX', 'New York', 20, print);
    client.HSET('ALX', 'Bogota', 20, print);
    client.HSET('ALX', 'Cali', 40, print);
    client.HSET('ALX', 'Paris', 2, print);
}


function displayHash() {
    client.HGETALL('ALX', (err, obj) => {
        if (err) {
            console.log('Error fetching hash:', err);
        } else {
            console.log(obj);
        }
    });
}

clearExistingKey();
setTimeout(() => {
    createHash();
    setTimeout(displayHash, 1000);
}, 1000);