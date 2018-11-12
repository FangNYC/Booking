const exec = require('child_process').exec;

console.log('seeding mongoDb from apartment.csv')

exec('mongoimport -d booking -c apartment --type csv --file ' + __dirname + '/apartment.csv --headerline',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });