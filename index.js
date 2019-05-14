#!/usr/bin/env node
const arequest = require('superagent');
const cheerio = require('cheerio');
const yargs = require('yargs');
const argv = yargs
    .usage( "Usage: [-u \"username\"] [-p \"password\"]" )
    .option( "u", { alias: "username", demand: false, describe: "Username in SMS Horizon", type: "string" } )
    .option( "p", { alias: "password", demand: false, describe: "Password of yor account", type: "string" } )
    .help( "?" )
    .alias( "?", "help" )
    .epilog( "By Riaz Ali Laskar" )
    .argv;



let check = function(username, password){
    const agent = arequest.agent();
    let login_url = `https://smshorizon.co.in/login-exec.php`;
    let payload = {'login' : username, 'password': password}

    agent
        .post(login_url)
        .type('form')
        .send(payload)
        .then((res)=>{
            var $ = cheerio.load(res.text);
            if($('.wrong').length){
                console.log($('.wrong').text())
            } else {
                console.log('SMS Horizon Balance:',$('.bal').text().replace('(trans_mtnl)',''));
            }
        })
        .catch((e)=>{
            console.log(e,'Error !!')
        })
}

check(argv.username,argv.password);