const Discord = require('discord.js'); // importe le module discord.js
const client = new Discord.Client({ fetchAllMembers: true }); // on crée une instance de bot
const fs = require('fs'); // importe le module fs ( chercher des dossiers/fichiers )
const { token } = require('./config.json'); // importe le fichier config

// COMMANDES
client.commands = new Discord.Collection(); // on crée un dossier virtuel qui stocke nos commandes

const commandFolders = fs.readdirSync('./commands'); // on cherche le dossier commands ( commandFolders )

for (const dossier of commandFolders) { // on cherche les dossiers présents dans le dossier commands
    const commandFiles = fs.readdirSync(`./commands/${dossier}`).filter(fichier => fichier.endsWith('.js')); // on cherche les dossiers du dossier commands et on cherche les fichiers terminant par ".js"

    for (const fichier of commandFiles) {
        const command = require(`./commands/${dossier}/${fichier}`); // on cherche des commandes
        client.commands.set(command.name, command); // on ajoute des commandes au dossier virtuel
    }
}

// EVENTS
fs.readdir('./events/', (error, fichier) => {
    fichier.forEach(fichier => {
        const events = require(`./events/${fichier}`); // accède au dossier events puis aux fichiers qui sont dedans
        const event = fichier.split('.')[0]; // on définit l'event

        client.on(event, events.bind(null, client)); // on lie les events au bot
    });
});

client.login(token); // on connecte le bot au token