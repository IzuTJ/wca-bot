const Discord = require('discord.js');
const fetch = require('node-fetch');
const { PREFIX, token } = require('./config.json');

const bot = new Discord.Client();

const apiUrl = 'https://www.worldcubeassociation.org/api/v0/';
const search = 'search/users?persons_table=true&q=';
let qry = '';
let result;

bot.on('message', async msg=>{
    if(msg.content.substring(0,PREFIX.length)===PREFIX){

        let args = msg.content.substring(PREFIX.length).split(" ");

        switch(args[0]){
            //a case for every supported bot command

            case 'search':
                qry = args[1];
                let requestUrl = apiUrl+search+qry;
                const result = await fetch(requestUrl).then(response => response.json());
                msg.reply(cuberName(result));
                break;

            case 'help':
                //insert code for help command here
                break;
                
            case 'test':
                msg.reply("I am listening");
                break;

            case:
                msg.reply('That is not a valid command. Type '+ PREFIX + 'help for a list of commands.')
        }
    }    
})

//declare functions here.
/*The functionality of search can be moved here
making the switch structure for commands cleaner and easier to understand*/
//I will put the list of functions that accepts json objects as arguments under this
//have to detach the discord message from this
function cuberName(jsonObj){
    let result = jsonObj['result'];
    let cuber = result[0];
    return cuber['name'];
}
bot.login(token);