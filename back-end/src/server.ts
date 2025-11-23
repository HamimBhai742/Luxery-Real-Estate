import { Server } from 'http';
import { app } from './app';
import { ENV } from './config/env';
let server: Server;
const PORT = ENV.PORT;
const startServer = async () => {
  server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
