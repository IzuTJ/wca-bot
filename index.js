const Discord = require('discord.js');
const bot = new Discord.Client();
const token = '';

const PREFIX= 'wca?';

bot.on('message', msg=>{
    if(msg.content.substring(0,PREFIX.length)===PREFIX){

        let args = msg.content.substring(PREFIX.length).split(" ");
        switch(args[0]){
            case 'help':
                //insert code for help command here
                break;
            
            case 'test':
                msg.reply("I am listening");
                break;
            case 'search':

            //add code to search for people using https://www.worldcubeassociation.org/api/v0/search/users?persons_table=true&q=
        }
    }    
})

bot.login(token)