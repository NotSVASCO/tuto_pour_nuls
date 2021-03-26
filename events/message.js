const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // on impose des règles

    // SET COMMANDS
    const args = message.content.slice(prefix.length).trim().split(/ +/); // on définit les arguments
    const commandName = args.shift().toLowerCase(); // on définit le nom des commandes

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // on définit la commande selon leur nom/alias

    if (!command) return; // si ce n'est pas une commande du bot, ça fait rien

    try {
        command.execute(client, message, args); // démarrer la commande
    } catch (error) {
        console.error(error);
        const embed = new Discord.MessageEmbed()
            .setDescription(`Une erreur s'est produite lors de l'execution de la commande : **${error}**`)
            .setColor('d10000')

        message.reply(embed).then(envoyé => envoyé.delete({ timeout: 5e3 }));
    }
};