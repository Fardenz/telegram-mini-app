import nodeConfig from 'config';

interface Config {
  dbConnectionString: string;

  /** The value for the web app frontent. */
  frontendEndpoint: string;

  /** The value for the telegram bot token. */
  botToken: string;

  /** The port number the server will run on. */
  webServerPort: number;

  /** The comission the casino gets on each victory */
  houseEdge: number;

  /** Stripe token given by telegram */
  stripeToken: string;
}

const config: Config = {
  botToken: nodeConfig.get<string>('botToken'),
  webServerPort: nodeConfig.get<number>('webServerPort'),
  frontendEndpoint: nodeConfig.get<string>('frontendEndpoint'),
  dbConnectionString: `mongodb+srv://${nodeConfig.get('mongodb.username')}:${nodeConfig.get('mongodb.password')}@${nodeConfig.get('mongodb.host')}/${nodeConfig.get('mongodb.db')}?ssl=true&retryWrites=true&w=majority`,
  houseEdge: nodeConfig.get<number>('houseEdge'),
  stripeToken: nodeConfig.get<string>('stripeToken')
};

export default config;