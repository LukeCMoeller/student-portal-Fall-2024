import * as dotenv from 'dotenv'

/**
 * Load environment variables from a .env file, if it exists.
 */

dotenv.config()

const config = {
  DISCORD_TOKEN: 'MTI4NTk4MzA4MzkyNDgyMDA3MA.GhYaKq.POsz_sDylprUr7MLzav19Cu8nFTq3pdoJDRN18',
  DISCORD_CLIENT_ID: 1285983083924820070,
  DISCORD_CLIENT_SECRET: '1fda68fc6fdcdf94315f48b62107decd3f0ed147dc3ac1a12ebcd62f63790f92',
  DISCORD_REDIRECT_URI: 'https://solid-fishstick-9rwpqw9r44vhxqxq.github.dev/discord-oauth-callback',
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};

export default config;
