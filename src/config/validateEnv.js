const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'DATABASE_NAME',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_HOST',
  'JWT_SECRET',
  'CORS_ORIGIN'
];

const validateEnv = () => {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    console.error('❌ Missing environment variables');
    missing.forEach(varName => console.error(`  - ${varName}`));
    console.error('\nSet these variables in the .env file');
    process.exit(1);
  }

  if (process.env.NODE_ENV === 'production') {
    if (process.env.JWT_SECRET.length < 32) {
      console.error('⚠️ WARNING: JWT_SECRET too small for production');
    }
    if (process.env.CORS_ORIGIN === '*') {
      console.error('⚠️ WARNING: CORS set to * in production');
    }
  }

  console.log('✅ Validated environment variables');
};

export default validateEnv;
