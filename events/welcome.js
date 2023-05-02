const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	once: true,
	execute(member) {
        let name = member.user.username;
        console.log(name);
        const { nickname } = member.guild.members.cache.find(E => E.id === member.id);
        if(nickname) name = nickname;
        name = name.replace("[Cheese]", "");
        const newname = "[Cheese] " + name;
        if(newname.length < 32)
            member.setNickname("[Cheese] " + name);

        let ch_id; 
        member.guild.channels.cache.each(channel => {
            if(channel.name === 'welcome'){
                ch_id = channel.id;
            }
        });

        if(ch_id) {
            const channel = member.guild.channels.cache.get(ch_id);
            return channel.send({ content: `Nice to cheese you ${member}!`})
        } else {
            console.log("Error! Failed to Find a Welcome Channel")
        }
	},
};