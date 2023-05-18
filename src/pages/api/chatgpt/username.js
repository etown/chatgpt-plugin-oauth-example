import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Check if this is a POST request and if the bearer token is present
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (req.method !== 'POST' || !match) {
    res.status(401).send('Unauthorized');
    return;
  }

  const bearerToken = match[1];

  // Find the user associated with this bearer token
  const user = await prisma.user.findUnique({
    where: { bearerToken },
  });

  // If the user is not found, return an error
  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

  // Get the query from the request body
  const { query } = req.body;

  // Return the user's username for the query
  res.json({
    results: [{
      query,
      results: [{ text: user.username }],
    }],
  });
}