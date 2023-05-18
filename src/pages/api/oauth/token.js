import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Check if this is a POST request
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // Extract the OAuth code and client's secret from the request body
  const { code, client_secret } = req.body;

  // Check if the client's secret is as expected
  if (client_secret !== process.env.CLIENT_SECRET) {
    res.status(401).send('Invalid client secret');
    return;
  }

  // Find the user associated with this OAuth code
  const user = await prisma.user.findUnique({
    where: { oauthCode: code },
  });

  if (!user) {
    res.status(400).send('Invalid OAuth code');
    return;
  }

  // Generate a new bearer token
  const bearerToken = Math.random().toString(36).substring(2, 15);

  // Save the bearer token to the user and set the OAuth code to null
  await prisma.user.update({
    where: { id: user.id },
    data: { bearerToken, oauthCode: null },
  });

  // Return the bearer token
  res.json({ access_token: bearerToken });
}