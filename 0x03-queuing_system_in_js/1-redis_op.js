import { createClient, print } from 'redis';

const client = createClient();

client.connect();

client.on('connect', () => console.log('Redis client connected to the server'));
client.on('error', (err) => console.log('Redis client not connected to the server: Error', err));

function setNewSchool(schoolName, value) {
    client.SET(schoolName, value, print);
}

function displaySchoolValue(schoolName) {
    client.GET(schoolName, (err, reply) => {
        console.log(reply);
    });
}

displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');