const { Client, GatewayIntentBits } = require('discord.js');
const User = require('../../models/discordmodel.js');
const db = require('../../configs/db.js');
beforeAll(async () => {
  db.migrate.latest()
})

beforeEach(async () => {
  db.seed.run()
})
require('dotenv').config();
describe('Discord Bot Tests', () => {
  let client;
  let discordModelTest;
  let ourServerguild;

  beforeAll(async () => {
    client = new Client({ 
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
      ] 
    });

    discordModelTest = new User();
    await client.login(process.env.DISCORD_SECRET);

    await new Promise((resolve) => {
      client.once('ready', async () => {
        ourServerguild = await client.guilds.fetch('1285994775282978900');
        resolve();
      });
    });
  });

  afterAll(async () => {
    await client.destroy();
  });

  test('Bot should log in Test', async () => {
    expect(client.user).not.toBeNull();
    console.log(`Logged in as ${client.user.tag}`);

  });

  test('Fetch accounts Test', async () => {
    const students = await discordModelTest.get_users_with_discord();
    expect(Array.isArray(students)).toBe(true);
  });

  test('matchClassesToRoles Test', () => {
    const Courses = [{ catalog: 'CIS 115' }, { catalog: 'CIS 200' }];
    const matchedRoles = matchClassesToRoles(Courses);
    expect(matchedRoles).toContain('1340083275179491328'); // CIS 115 role
    expect(matchedRoles).toContain('1340083455555276821'); // CIS 200 role
  });

  //test below fails due to discord api permsission errors. im not entirely sure why though as it should have permissions.
  //potentially in the future create a test to make sure when upadint discord roles a student gets all 
  //cs courses as roles in the discord server. 
 /*
  test('handleSelectStudentRoled Test', async () => {
    const studentDiscordID = '592454625270038547'; //test discord linked in the seeding files
    const member = await ourServerguild.members.fetch(studentDiscordID).catch(() => null);

    member.roles.cache.forEach(role => member.roles.remove(role)); //remove all roles
    //below code is the same as in discordbot
    let student_courses = await discordModelTest.get_student_courses(studentDiscordID);
    let student_roles = matchClassesToRoles(student_courses);
    
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

    expect(member.roles.cache.size).toBeGreaterThan(0); //confirm roles were added via test seeding

  });
  */

  //hardcoded roles value. would need to be changed 
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
  //function to match hard coded roles of courses to discord roles
  function matchClassesToRoles(listOfCourses) {
    let convertedCourses = [];
    for (let i = 0; i < listOfCourses.length; i++) {
      if (listOfCourses[i].catalog.includes(115)) convertedCourses.push(roles[0]);
      if (listOfCourses[i].catalog.includes(200)) convertedCourses.push(roles[1]);
      if (listOfCourses[i].catalog.includes(300)) convertedCourses.push(roles[2]);
    }
    return convertedCourses;
  }
});
