module.exports = async(client) => {
    client.user.setPresence({activity: { name: '$help', type: 'WATCHING'}, status: 'dnd'});

    console.clear();
    console.log('Je suis prêt !');
};