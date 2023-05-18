import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Check if this is a GET request
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // Extract the query parameters from the request
  const { response_type, client_id, redirect_uri, scope } = req.query;

  // Check if the response_type and client_id are as expected
  if (response_type === 'code' && client_id === process.env.CLIENT_ID) {
    // Check if the user is already logged in
    const session = await getSession({ req });

    if (!session) {
      // If the user is not logged in, redirect to the NextAuth sign-in page
      res.redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(req.url)}`);
    } else {
      // Generate a new OAuth code
      const oauthCode = Math.random().toString(36).substring(2, 15);

      // Save the OAuth code for the user
      await prisma.user.update({
        where: { id: session.user.id },
        data: { oauthCode },
      });

      // Redirect to the provided redirect_uri with the OAuth code
      res.redirect(`${redirect_uri}?code=${oauthCode}`);
    }
  } else {
    // Handle invalid requests
    res.status(400).send('Invalid request');
  }
}