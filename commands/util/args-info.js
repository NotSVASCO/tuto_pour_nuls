module.exports = {
    name: 'args-info',
    description: 'Donne les informations sur les différents arguments.',
    usage: '<arguments>',
    aliases: ["ai", "a-i"],
    execute(client, message, args) {
        message.channel.send(`Arguments : ${args}\nTaille des arguments : ${args.length}`);
    }
}