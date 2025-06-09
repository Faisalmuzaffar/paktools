export const config = {
  runtime: 'edge'
};

export default function handler() {
  return new Response(
    JSON.stringify({
      status: 'ok',
      service: 'pak-tools',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.VERCEL_ENV || 'development',
      author: 'Faisal Muzaffar'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  );
}
