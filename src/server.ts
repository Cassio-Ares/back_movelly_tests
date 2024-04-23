import 'dotenv/config';
import { database } from './database';

async function startServer() {
  await database.providers.prisma.connect();

  const { app } = require('./app');

  app.listen(3000, async () => {
    console.info('[INFO]: Listening on port 3000!');
  });
}

startServer();
