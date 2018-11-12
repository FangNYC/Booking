const exec = require('child_process').exec;

console.log('seeding mysql from apartment.csv')

const cmd = 'mysql -u root --local-infile < ' + __dirname + '/seed.sql;'
exec(cmd,
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });