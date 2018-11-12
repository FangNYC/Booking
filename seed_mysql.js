const exec = require('child_process').exec;
const cmd = 'mysql -u root --local-infile < ' + __dirname + '/seed.sql;'
console.log(cmd)
exec(cmd,
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });