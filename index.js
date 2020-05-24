const Discord = require('discord.js');
const fetch = require('node-fetch');


const bot = new Discord.Client();
const token = '';

const PREFIX= 'wca?';

const apiUrl = 'https://www.worldcubeassociation.org/api/v0/';
const search = 'search/users?persons_table=true&q=';
let qry = '';
let result;

bot.on('message', async msg=>{
    if(msg.content.substring(0,PREFIX.length)===PREFIX){

        let args = msg.content.substring(PREFIX.length).split(" ");

        switch(args[0]){
            //a case for every supported bot command

            case 'help':
                //insert code for help command here
            break;
            
            case 'test':
                msg.reply("I am listening");
            break;

            case 'search':
                qry = args[1];
                let requestUrl = apiUrl+search+qry;
                const result = await fetch(requestUrl).then(response => response.text());
                displayName(JSON.parse(result), msg);
            break;
        }
    }    
})

//declare functions here.
/*The functionality of search can be moved here
making the switch structure for commands cleaner and easier to understand*/

function displayName(jsonObj, message){
    let result = jsonObj['result'];
    let cuber = result[0];
    let cubername = cuber['name'];
    message.channel.send(cubername);
}
bot.login(token)