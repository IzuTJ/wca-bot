const Discord = require('discord.js');
const fetch = require('node-fetch');
const { PREFIX, token } = require('./config.json');

const bot = new Discord.Client();

const apiUrl = 'https://www.worldcubeassociation.org/api/v0/';
const search = 'search/users?persons_table=true&q=';
let requestUrl = '';

const help = new Discord.MessageEmbed()
	.setTitle('**WCA Bot Commands**')
	.setColor(0xff3e15)
	.setDescription('All commands must have the "wca?" prefix followed by the command name without any space.')
	.addField(PREFIX + 'search', 'Searches for WCA profiles based on their name or WCA id\nExample: `' + PREFIX + 'search 2015JAMW`')
	.addField(PREFIX + 'test', 'Asks the WCA bot if it is listening. It will reply to you if it is.');

bot.on('ready', () =>{
	console.log('I am ready!');
});

bot.on('message', async msg =>{
	if(msg.content.substring(0, PREFIX.length) === PREFIX){

		const args = msg.content.substring(PREFIX.length).split(' ');
		let qry = '';

		switch(args[0]){
		// a case for every supported bot command

		case 'search':
			for(let i = 1; i < args.length; i++){
				qry += '%20' + args[i];
			}
			requestUrl = apiUrl + search + qry;
			try{
				const result = await fetch(requestUrl).then(request => request.json());
				msg.channel.send(cuberEmbed(result));
			}
			catch(e){
				msg.channel.send('The server did not respond. Please try again later.\nIf error persists, notify the devs so they can look into it.');
				console.log(e);
			}
			break;

		case 'help':
			msg.channel.send(help);
			break;

		case 'test':
			msg.reply('I am listening');
			break;

		default:
			msg.reply('That is not a valid command. Type `' + PREFIX + 'help` for a list of commands.');
		}
	}
});

// declare functions here.
/* The functionality of search can be moved here
making the switch structure for commands cleaner and easier to understand*/
// I will put the list of functions that accepts json objects as arguments under this
// have to detach the discord message from this
function cuberEmbed(jsonObj){
	const cuber = jsonObj['result'][0];
	const embed = new Discord.MessageEmbed()
		.setTitle(cuber['name'])
		.setImage(cuber.avatar.thumb_url)
		.addField('WCA id', cuber['wca_id'])
		.addField('Country', cuber.country_iso2);
	return embed;
}
bot.login(token);