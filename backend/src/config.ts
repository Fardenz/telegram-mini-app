import nodeConfig from 'config';

interface Config {
  dbConnectionString: string;
  
  /** The value for the web app frontent. */
  frontendEndpoint: string;
  
  /** The value for the telegram bot token. */
  botToken: string;

  /** The port number the server will run on. */
  webServerPort: number

}

const config: Config = {
  botToken: nodeConfig.get<string>('botToken'),
  webServerPort: nodeConfig.get<number>('webServerPort'),
  frontendEndpoint: nodeConfig.get<string>('frontendEndpoint'),
  dbConnectionString: `mongodb://${nodeConfig.get('mongodb.username')}:${nodeConfig.get('mongodb.password')}@${nodeConfig.get('mongodb.host')}:${nodeConfig.get('mongodb.port')}/${nodeConfig.get('mongodb.db')}`
};

export default config;