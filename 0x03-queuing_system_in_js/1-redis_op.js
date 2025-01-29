import { createClient, print } from 'redis';

const client = createClient();

client.connect()


client.on('connect', () => console.log('Redis client connected to the server'));
client.on('error', (err) => console.log('Redis client not connected to the server: Error', err));

function setNewSchool(schoolName, value, callback) {
    client.SET(schoolName, value,(err, reply) => {
        if (err) {
            console.log('Error setting school:', err);
        } else {
            print('Reply: ${reply}');
        }
        callback && callback(reply);
    });
}

function displaySchoolValue(schoolName, callback) {
    client.GET(schoolName, (err, reply) => {
        if (err) {
            console.log('Error displaying school value:', err);
        } else {
            console.log(reply);
        }
        callback && callback(reply);
    });
}

displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');