import 'dotenv/config';
import express from 'express';
import sequelize from './db/index.js';
import routes from './routes/index.js';

import { helmet, cors } from './middlewares/security.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const app = express();

app.use(helmet);
app.use(cors);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

sequelize.sync();

app.use('/api', routes);

app.get('/health', (_, res) => {
  res.json({
    success: true,
    message: 'KiFome API working',
    timestamp: new Date().toISOString()
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
