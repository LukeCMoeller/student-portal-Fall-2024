const Model = require('../models/base.js');
const User = require('../models/discordmodel.js');
const { Client, GatewayIntentBits } = require('discord.js');

class discord extends Model {}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const discordModelTest = new User();
let ourServerguild;
let TestingDatabaseAll = false;
let TestingDatabaseSingle = false;

let roles = [
  '1340083275179491328', // CIS 115 student
  '1340083455555276821', // CIS 200 student
  '1345109207837446255', // CIS 300 student
  '2222222222222222222', // CIS 308 student FAKE
  '3333333333333333333', // CIS 415 student FAKE
  '4444444444444444444', // CIS 450 student FAKE
  '5555555555555555555', // CIS 501 student FAKE
  '6666666666666666666', // CIS 505 and 705 student FAKE
  '7777777777777777777', // CIS 520 student FAKE
  '8888888888888888888', // CIS 527 and 510 student FAKE
  '9999999999999999999', // CIS 580 student FAKE
  '1010101010101010101', // CIS 642 and 643 student FAKE
  '1101101101101101101', // CIS 015 and 018 student FAKE
];

let all_students;

client.login(process.env.DISCORD_SECRET).catch(console.error);
client.once('ready', async () => {
  console.log('Bot is online!');
  ourServerguild = await client.guilds.cache.get('1285994775282978900');
  if (!ourServerguild) {
    console.error('Guild not found!');
    return;
  }
  all_students = await discordModelTest.get_users_with_discord();

  if (TestingDatabaseAll) {
    handleAllStudentRoles();
    TestingDatabaseAll = false;
  }
  if (TestingDatabaseSingle) {
    let mydiscord = '592454625270038547';
    handleSelectStudentRoled(mydiscord);
    TestingDatabaseSingle = false;
  }
});

function matchClassesToRoles(listOfCourses) {
  let convertedCourses = [];
  for (let i = 0; i < listOfCourses.length; i++) {
    if (listOfCourses[i].catalog.includes(115)) convertedCourses.push(roles[0]);
    if (listOfCourses[i].catalog.includes(200)) convertedCourses.push(roles[1]);
    if (listOfCourses[i].catalog.includes(300)) convertedCourses.push(roles[2]);
    //put more courses here
  }
  return convertedCourses;
}

async function handleAllStudentRoles() {
  for (let x = 0; x < all_students.length; x++) {
    let student_courses = await discordModelTest.get_student_courses(all_students[x].discord_id);
    let student_roles = matchClassesToRoles(student_courses);
    const member = await ourServerguild.members.fetch(all_students[x].discord_id).catch(() => null);
    if (!member) {
      console.error('Student not found');
    } else {
      try {
        const rolesToRemove = member.roles.cache.filter(role => roles.includes(role.id));
        if (rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
        for (let y = 0; y < student_roles.length; y++) {
          const role = ourServerguild.roles.cache.get(student_roles[y]);
          await member.roles.add(role);
        }
      } catch (error) {
        console.error('Error adding role:', error);
      }
    }
  }
}

async function handleSelectStudentRoled(studentDiscordID) {
  let student_courses = await discordModelTest.get_student_courses(studentDiscordID);
  let student_roles = matchClassesToRoles(student_courses);
  const member = await ourServerguild.members.fetch(studentDiscordID).catch(() => null);
  if (!member) {
    console.error('Student not found');
  } else {
    try {
      const rolesToRemove = member.roles.cache.filter(role => roles.includes(role.id));
      if (rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
      for (let y = 0; y < student_roles.length; y++) {
        const role = ourServerguild.roles.cache.get(student_roles[y]);
        await member.roles.add(role);
      }
    } catch (error) {
      console.error('Error adding role:', error);
    }
  }
}

client.on('guildMemberAdd', async (member) => {
  if (!member) {
    console.error('Member not found!');
    return;
  }
  const welcomeChannel = member.guild.channels.cache.get('1306295646248239134');
  if (welcomeChannel) {
    welcomeChannel.send(`Welcome to the server, ${member.user.tag}! 🎉`);
  }
  try {
    await member.roles.add('1308820949310902282');
    console.log(`Roles added for member: ${member.user.tag}`);
  } catch (error) {
    console.error('Error adding role:', error);
  }
});

module.exports = discord;