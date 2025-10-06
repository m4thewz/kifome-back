import HELMET from 'helmet';
import CORS from 'cors';
// TODO: rate-limit

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins =
      process.env.NODE_ENV === 'production'
        ? process.env.CORS_ORIGIN.split(',')
        : ['http://localhost:3000', 'http://localhost:5173'];

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export const helmet = HELMET();
export const cors = CORS(corsOptions);
