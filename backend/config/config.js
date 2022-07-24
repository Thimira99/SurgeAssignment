const config = {};

config.web_port = process.env.HTTP_PORT;

// DB
config.database = process.env.DATABASE_URL;

config.app_name = process.env.APP_NAME;
config.server_path = process.env.SERVER_PATH;

module.exports = config;
