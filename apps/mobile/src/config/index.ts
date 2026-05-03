const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000/api',
    environment: 'development',
  },
  staging: {
    apiUrl: 'https://staging-api.example.com/api',
    environment: 'staging',
  },
  prod: {
    apiUrl: 'https://api.example.com/api',
    environment: 'production',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars();
