import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import axios from 'axios';

if (!process.env.REACT_APP_SERVER_URL) throw `Environmental variable 'REACT_APP_SERVER_URL' is required. Add it to '.env' file. Example: 'REACT_APP_SERVER_URL=http://localhost:3030'.`;
const client = feathers();
const restClient = rest(process.env.REACT_APP_SERVER_URL);
client.configure(restClient.axios(axios));
client.configure(auth({ storage: window.localStorage }));

export default client;

