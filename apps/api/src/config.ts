export const config = {
  port: Number(process.env.API_PORT ?? 4000),
  appOrigins: (process.env.APP_ORIGIN ?? 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
};
