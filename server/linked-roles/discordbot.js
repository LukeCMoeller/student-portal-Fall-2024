const Model = require('../models/base.js')
const User = require('../models/discordmodel.js')


class discord extends Model {
  static async runDiscordBot() {
    const { Client, GatewayIntentBits, Guild } = require('discord.js');
    const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ] });
    let ourServerguild;
    const discordModelTest = new User();
    let TestingDatabaseAll = false; //trigger this to run the async function once
    let TestingDatabaseSingle = true; //trigger this to run the async function once
    let roles = [ //as of now there are 13 cs classes in the cs discord
      '1340083275179491328', // CIS 115 student
      '1340083455555276821', // CIS 200 student
      '1111111111111111111', // CIS 300 student FAKE
      '2222222222222222222', // CIS 308 student FAKE
      '3333333333333333333', // CIS 415 student FAKE
      '4444444444444444444', // CIS 450 student FAKE
      '5555555555555555555', // CIS 501 student FAKE
      '6666666666666666666', // CIS 505 and 705 student FAKE 
      '7777777777777777777', // CIS 520 student FAKE
      '8888888888888888888', // CIS 527 and 510 student FAKE
      '9999999999999999999', // CIS 580 student FAKE
      '1010101010101010101', // CIS 642 and 643 student FAKE
      '1101101101101101101' // CIS 015 and 018 student FAKE
    ];
    let all_students;
    client.login(process.env.DISCORD_SECRET).catch(console.error);
    client.once('ready',async () => {
      console.log('Bot is online!');
      ourServerguild = await client.guilds.cache.get('1285994775282978900'); // the server id
      if (!ourServerguild) {
        console.error('Guild not found!');
        return;
      }
      roles = roles.map(roleID => {
        const role = ourServerguild.roles.cache.get(roleID);
        if (!role) {
        }
        return role;
      }).filter(role => role); 
      all_students = await discordModelTest.get_users_with_discord();// get all students discord ids
      /*
      if(TestingDatabaseAll){ //runs the test for all students
        handleAllStudentRoled();
        TestingDatabaseAll = false;
      }
      
      if(TestingDatabaseSingle){//runs the test for a single student
        let mydiscord = 592454625270038547;
        handleSelectStudentRoled(mydiscord);//need a discord id here)
        TestingDatabaseSingle = false;
      }
        */
    });

    //turns the class numbers into the roles for discord
    function matchClassesToRoles(listOfCourses){
      const convert = Object.values(listOfCourses);

      let new_List = [];
      if(convert.includes(115)){
        new_List.push(roles[0]); //add 115 discord role
      }
      if(convert.includes(200)){
        new_List.push(roles[1]); //add 200 discord role
      }
      //add more couses here
      return new_List;
    }

    //not 100% any of this works given the correct input. but this is more of a base setup + trying to explain what it all does
    async function handleAllStudentRoled(){
      //maybe better way to handle this than a simple for loop but should get the job done. 
      //for note all_students[x] it just a plane discord ID. nothing else to it
      for(let x = 0; x < all_students.length; x++){ // for each student in the we grabbed with a valid discord id

        let student_courses = await discordModelTest.get_student_courses(all_students[x]); //get all the courses from that student. 
        student_roles = matchClassesToRoles(student_courses); //converst all the courses to the designated discord roles

        const member = await ourServerguild.members.fetch(all_students[x]).catch(() => null); //get the actual user from our discord
        if (!member) { //simple check they they are acaully in the server and didnt leave or something
          console.error('Student not found');
        }else{
          try{
            const rolesToRemove = member.roles.cache.filter(role => roles.includes(role.id)); //get a refrence to the members roles
            if (rolesToRemove.size > 0) { //remove all roles from the list of previous roles but keep everything else
              await member.roles.remove(rolesToRemove);
            }
  
            for(let y = 0; y < student_roles.length; y++){//iterate through all user roles
              const role = ourServerguild.roles.cache.get(student_roles[y]);//get the role from discord
              await member.roles.add(role); //add the role
            }
            console.log(`Roles added from member: ${member.user.tag}`);
          }catch (error){
            console.error('Error adding role:', error);
          }
        }
        
      }
    };

    async function handleSelectStudentRoled(studentDiscordID){ //almost the same as handleAllStudentRoled
     let student_courses = await discordModelTest.get_student_courses(studentDiscordID); //get all the courses from that student. 
     console.log(student_courses);
     let student_roles = matchClassesToRoles(student_courses); //same as in processRolesForAllStudnets
     const member = await ourServerguild.members.fetch(studentDiscordID).catch(() => null); //get the actual user from our discord
        if (!member) {
          console.error('Student not found');
        }else{
        try{
          const rolesToRemove = member.roles.cache.filter(role => roles.includes(role.id)); //get a refrence to the members roles
          if (rolesToRemove.size > 0) {//remove all roles from the list of previous roles but keep everything else
            await member.roles.remove(rolesToRemove);
          }

          for(let y = 0; y < student_roles.length; y++){//iterate through all user roles
            const role = ourServerguild.roles.cache.get(student_roles[y]);//get the role from discord
            await member.roles.add(role); //add the role
          }
          console.log(`Roles added from member: ${member.user.tag}`);
        }catch (error){
          console.error('Error adding role:', error);
        }
      }
    }

    client.on('guildMemberAdd', async (member) => { 
      //check for previous discord account and remove from server
      if (!member) {
        console.error('Member not found!');
        return;
      }
      const welcomeChannel = member.guild.channels.cache.get('1306295646248239134');//channel id for welcome
      if (welcomeChannel) {
        welcomeChannel.send(`Welcome to the server, ${member.user.tag}! 🎉`);
      }
      try{
        await member.roles.add('1308820949310902282');//give user the student role
        console.log(`Roles added from member: ${member.user.tag}`);
      }catch (error){
        console.error('Error adding role:', error);
      }
    });
      

  }

}
module.exports = discord