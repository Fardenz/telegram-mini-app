import nodeConfig from 'config';

interface Config {
  
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
};

export default config;