const Model = require('../models/base.js')
const discordModel = require('../models/discordmodel.js')
//const crypto = require('crypto')


class discord extends Model {
  static async runDiscordBot() {
    const { Client, GatewayIntentBits, Guild } = require('discord.js');
    const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ] });
    let all_students = discordModel.get_users_with_discord();// get all students discord ids
    let TestingDatabaseAll = false;
    let TestingDatabaseSingle = false;
    let ourServerguild;
    let roles = [
      '1340083275179491328', // CIS 100 student
      '1340083455555276821'  // CIS 200 student
      //the rest of the roles here in the future
    ];

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
    //not 100% any of this works given the correct input. but this is more of a base setup + trying to explain what it all does
    async function handleAllStudentRoled(){
      //maybe better way to handle this than a simple for loop but should get the job done. 
      //for note all_students[x] it just a plane discord ID. nothing else to it
      for(let x = 0; x < all_students.length; x++){ // for each student in the we grabbed with a valid discord id

        let student_courses = get_student_courses(all_students[x]); //get all the courses from that student. 
        //need code here to match the course with the ID from Roles.
        //how that will figure out im not sure. will depend on what student_courses is later. 
        let student_roles = roles; //for testing lets just say this line does it, in the future this needs to be specifcally the id of the role in discord

        const member = await ourServerguild.members.fetch(all_students[x]).catch(() => null); //get the actual user from our discord
        if (!member) { //simple check they they are acaully in the server and didnt leave or something
          console.error('Student not found');
          //maybe have code here to edit database to remove the student? no clue
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

     let student_courses = get_student_courses(studentDiscordID); //get all the courses from that student. 
     let student_roles = roles; //same as in processRolesForAllStudnets just for testing
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
    if(TestingDatabaseAll){ //runs the test for all students
      handleAllStudentRoled();
      TestingDatabaseAll = false;
    }
    if(TestingDatabaseSingle){//runs the test for a single student
      handleSelectStudentRoled('some users discord id');//need a discord id here)
      TestingDatabaseSingle = false;
    }

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
        await member.roles.add('1308820949310902282');//give user the student role
        console.log(`Roles added from member: ${member.user.tag}`);
      }catch (error){
        console.error('Error adding role:', error);
      }
    });
  }
}
module.exports = discord