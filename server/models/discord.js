//Discord
const { Client, GatewayIntentBits, Guild } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
] });
let ourServerguild;
let role;
//client.login('remove this MTI4NjU remove this xMj remove this gyNz A1Mz M remove this 3OTc 1Ng.GjHn remove this pU.0Xf2tpt3 kBCVrTY kL_M-aWjl pOXHh3Gs g_B y-Y');
//KEEP SAFE   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
client.once('ready',async () => {
  console.log('Bot is online!');
  ourServerguild = client.guilds.cache.get('1285994775282978900'); // the server id
  if (!ourServerguild) {
    console.error('Guild not found!');
    return;
  }
  role = ourServerguild.roles.cache.get('1285995785141485568'); //the role id
  if (!role) {
    console.error('Role not found!');
    return;
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
  try{
    await member.roles.add(role);
    console.log(`Role added from member: ${member.user.tag}`);

  }catch (error){
    console.error('Error adding role:', error);
  }
});