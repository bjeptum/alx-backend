import { commandOptions, createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.connect()


client.on('connect', () => console.log('Redis client connected to the server'));
client.on('error', (err) => console.log('Redis client not connected to the server: Error', err));


const getAsync = promisify (client.GET).bind(client);

async function setNewSchool(schoolName, value,) {
    await client.SET(schoolName, value);
    console.log(`Set value for ${schoolName}: ${value}`);
}

async function displaySchoolValue(schoolName) {
    try {
        const reply = await getAsync(schoolName);
        console.log(reply);
    } catch (err) {
        console.log('Error fetching value:', err);
    }
}

async function run() {
    await displaySchoolValue('ALX');
    await setNewSchool('ALXSanFrancisco', '100');
    await displaySchoolValue('ALXSanFrancisco');
}

run();
