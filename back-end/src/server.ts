import { Server } from 'http';
import { app } from './app';
import { ENV } from './config/env';
import { connectDB } from './config/conneect.db';
import { seedAdmin } from './utils/seedAdmin';
let server: Server;
const PORT = ENV.PORT;

const startServer = async () => {
  server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
(() => {
  connectDB();
  startServer();
  seedAdmin();
})();

