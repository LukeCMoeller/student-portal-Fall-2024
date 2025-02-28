const Model = require('../models/base.js')
const User = require('../models/discordmodel.js')


class discord extends Model {
  static async runDiscordBot() {
    const { Client, GatewayIntentBits} = require('discord.js');
    const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ] });
    let ourServerguild;
    const discordModelTest = new User();
    let TestingDatabaseAll = false; //trigger this to run the async function once
    let TestingDatabaseSingle = false; //trigger this to run the async function once
    let roles = [ //as of now there are 13 cs classes in the cs discord
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
      '1101101101101101101' // CIS 015 and 018 student FAKE
    ];
    let all_students; //put here to be in scope. will be the place all students with a discord account it. 
    client.login(process.env.DISCORD_SECRET).catch(console.error);
    client.once('ready',async () => {
      console.log('Bot is online!');
      ourServerguild = await client.guilds.cache.get('1285994775282978900'); // the server id
      if (!ourServerguild) {
        console.error('Guild not found!');
        return;
      }
      all_students = await discordModelTest.get_users_with_discord();// get all students discord ids

      //in the future. set up a way to call this function from a button press
      //or automatically at the beginning of every semester
      if(TestingDatabaseAll){ //runs the test for all students
        handleAllStudentRoled();
        TestingDatabaseAll = false;
      }
      //in the future, set up a way to call this with a prompt and a button
      //or automatically whenever a student is added to the database or corses are updated
      if(TestingDatabaseSingle){//runs the test for a single student
        let mydiscord = "592454625270038547";
        handleSelectStudentRoled(mydiscord);//need a discord id here)
        TestingDatabaseSingle = false;
      }
        
    });
    
    //turns the class numbers into the roles for discord
    function matchClassesToRoles(listOfCourses){
      let convertedCourses = [];
      for(let i = 0; i < listOfCourses.length; i++){
        if(listOfCourses[i].catalog.includes(115)){
          convertedCourses.push(roles[0]); //add 115 discord role
        }
        if(listOfCourses[i].catalog.includes(200)){
          convertedCourses.push(roles[1]); //add 200 discord role
        }
        if(listOfCoures[i].catalog.includes(300)){
          convertedCourses.push(roles[2]); //add 300 discord role
        }
        /*
        if(listOfCourses[i].catalog.includes(308)){
          convertedCourses.push(roles[3]); //add 308 discord role
        }
        if(listOfCourses[i].catalog.includes(415)){
          convertedCourses.push(roles[4]); //add 415 discord role
        }
        if(listOfCoures[i].catalog.includes(450)){
          convertedCourses.push(roles[5]); //add 450 discord role
        }
        if(listOfCoures[i].catalog.includes(501)){
          convertedCourses.push(roles[6]); //add 501 discord role
        }
          if(listOfCourses[i].catalog.includes(505) || listOfCourses[i].catalog.includes(705)){
          convertedCourses.push(roles[7]); //add 505 / 705 discord role
        }
        if(listOfCourses[i].catalog.includes(520)){
          convertedCourses.push(roles[8]); //add 520 discord role
        }
        if(listOfCoures[i].catalog.includes(527) || listOfCoures[i].catalog.includes(510)){
          convertedCourses.push(roles[9]); //add 527 / 510 discord role
        }
        if(listOfCourses[i].catalog.includes(580)){
          convertedCourses.push(roles[10]); //add 580 discord role
        }
        if(listOfCoures[i].catalog.includes(642) || listOfCoures[i].catalog.includes(643)){
          convertedCourses.push(roles[11]); //add 642 / 643 discord role
        }
        if(listOfCoures[i].catalog.includes(015) || listOfCoures[i].catalog.includes(018)){
          convertedCourses.push(roles[12]); //add 015 / 018 discord role
        }
        */
      }
      return convertedCourses;
    }

    //function that takes in all the students and gives them designated roles
    async function handleAllStudentRoled(){
      //for note all_students[x] it just a plane discord ID. nothing else to it
      for(let x = 0; x < all_students.length; x++){ // for each student in the we grabbed with a valid discord id
        let student_courses = await discordModelTest.get_student_courses(all_students[x].discord_id); //get all the courses from that student. 
        let student_roles = matchClassesToRoles(student_courses); //converst all the courses to the designated discord roles
        const member = await ourServerguild.members.fetch(all_students[x].discord_id).catch(() => null); //get the actual user from our discord
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
            //console.log(`Roles added from member: ${member.user.tag}`); //wont need this later
          }catch (error){
            console.error('Error adding role:', error);
          }
        }
      }
    };
    //same as above but can be called for a select student
    async function handleSelectStudentRoled(studentDiscordID){
     let student_courses = await discordModelTest.get_student_courses(studentDiscordID); //get all the courses from that student. 
     let student_roles = matchClassesToRoles(student_courses); //same as in processRolesForAllStudnets
     const member = await ourServerguild.members.fetch(studentDiscordID).catch(() => null); //get the actual user from our discord
        if (!member) { //check if member dosnt exist
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
          //console.log(`Roles added from member: ${member.user.tag}`); wont need this later
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