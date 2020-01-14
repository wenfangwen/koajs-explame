import config from './database';
const { host, database, username, password, port } = config;

export const ConnectStr = `mongodb://${username}:${password}@${host}:${port}/${database}`;
