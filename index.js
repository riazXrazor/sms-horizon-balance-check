#!/usr/bin/env node
const yargs = require('yargs');
const fetch = require('node-fetch');
const argv = yargs
    .usage( "Usage: [-u \"username\"] [-k \"API KEY\"]" )
    .option( "u", { alias: "username", demand: false, describe: "Username in SMS Horizon", type: "string" } )
    .option( "k", { alias: "apiKey", demand: false, describe: "API key", type: "string" } )
    .help( "?" )
    .alias( "?", "help" )
    .epilog( "By Riaz Ali Laskar" )
    .argv;



let check = function(username, apiKey){
    let url = `http://smshorizon.co.in/api/balance.php?user=${username}&apikey=${apiKey}`;
    fetch(url)
    .then(res => res.text())
    .then(r => console.log(r))
    .catch(r => console.error(r))
}

check(argv.username,argv.apiKey);