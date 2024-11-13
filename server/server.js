//TODO: Update all http to https address, local env was not set up correctly. 
const express = require('express');
const cors = require('cors');
const logger = require('./configs/logger.js');
const util = require('node:util');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const session = require('./configs/session.js');
const serverConfig = require('./configs/server');
const knex = require('./configs/db');

//Discord
const { Client, GatewayIntentBits, Guild } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
] });
let ourServerguild;
let role;  
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

const app = express();
const PORT = serverConfig.port || 3001;

app.set('knex', knex);

app.disable('etag');

app.use(express.json());

app.use(session);

// Middleware
const corsConfig = require('./middleware/corsConfig');
app.use(corsConfig);

// Cookie Parsing
app.use(cookieParser(process.env.APP_SECRET));

// Routes
const apiRoutes = require('./routes/api.js');
const courseRoutes = require('./routes/courseRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const dataRoutes = require('./routes/dataRoutes');
const authRoutes = require('./routes/auth'); // Renamed for clarity
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/api/v1', (req, res, next) => {console.log(req.path); next()}, apiRoutes);
app.use('/api', courseRoutes);
app.use('/api', applicationRoutes);
app.use('/api', dataRoutes);
app.use('/auth', authRoutes);
app.use('/api', adminRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  logger.error('404: ' + req.url + ' : ' + req.originalUrl)
  next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  logger.error(util.inspect(err))
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});