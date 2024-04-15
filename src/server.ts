import 'dotenv/config';
import { app } from './app';
import { database } from './database';

app.listen(3000, async () => {
  await database.connect();
  console.info('[INFO]: Listening on port 3000!');
});


