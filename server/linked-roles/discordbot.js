const Model = require('../models/base.js')
//const crypto = require('crypto')


class discord extends Model {
  static async runDiscordBot() {
    const { Client, GatewayIntentBits, Guild } = require('discord.js');
    const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ] });
    let TestingDatabase = false;
    let Testing100 = false;
    let Testing200 = false;
    let ourServerguild;
    let roles = [
      '1308820949310902282', // Student role
      '1340083275179491328', // CIS 100 student
      '1340083455555276821'  // CIS 200 student
    ];
    let hasRoles = new Array(roles.length).fill(false);
    //const uniqueId = crypto.randomUUID(); handled elsewhere
    //console.log("nexline");
    //console.log(uniqueId);
    client.login(process.env.DISCORD_SECRET);
    client.once('ready',async () => {
      console.log('Bot is online!');
      ourServerguild = client.guilds.cache.get('1285994775282978900'); // the server id
      if (!ourServerguild) {
        console.error('Guild not found!');
        return;
      }
      for(let i = 0; i < roles.length; i++){
        roles[i] = ourServerguild.roles.cache.get(roles[i]);
        if(!roles[i]){
          console.error('Role not found!');
          return;
        }
      }
    });
    client.on('guildMemberAdd', async (member) => { 
      if (!member) {
        console.error('Member not found!');
        return;
      }
      const welcomeChannel = member.guild.channels.cache.get('1306295646248239134');//channel id for welcome
      if (welcomeChannel) {
        welcomeChannel.send(`Welcome to the server, ${member.user.tag}! 🎉`);
      }
      const username = member.user.username;
      if(TestingDatabase){
        for(let i = 0; i < roles.length; i++){
        if(username){//discord username is in database
          let classes; //somehow get a list of every class the user has 
          for(let i = 1; i < roles.length; i++){
            if(hasRoles[i]){
              roles[i] = ourServerguild.roles.cache.get(roles[i]);
            }
          }
        }else{
          //maybe give them role that limits everything
        }
      }
      try{
        await member.roles.add(roles[0]);
        if(Testing100){
          await member.roles.add(ourServerguild.roles.cache.get(roles[1]));
        }
        if(Testing200){
          await member.roles.add(ourServerguild.roles.cache.get(roles[2]));
        }
        console.log(`Roles added from member: ${member.user.tag}`);
      }catch (error){
        console.error('Error adding role:', error);
      }
    });

  }
}
module.exports = discord