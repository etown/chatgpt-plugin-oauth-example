This is a very basic example of how to make a ChatGPT plugin which supports oauth authentication so users can access their data from your application in ChatGPT.

## ⚠️ IMPORTANT ⚠️
This is just a very simple example to allow quick prototyping. You would never want to use this in production. For that, you'd probably want to use a secure and maintained [library](https://github.com/panva/node-oidc-provider) to handle the oauth flow.

## Getting Started

You need ChatGPT developer access to deploy plugins.

First install dependencies and initialize the local database:
```
npm i
npx prisma migrate dev --name init
```
For authenticated plugins, OpenAI needs to communicate with your server during the login flow. You need to use a tunnel like [Cloudflare](https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/) or [ngrok](https://ngrok.com/).

Set the `HOST` and `NEXTAUTH_URL` variables in the sample .env file to your tunnel URL.

Start the server:
```
npm run dev
```

Go to [ChatGPT](https://chat.openai.com/) and select the plugin model. 

Then click on the plugin library and click `Plugin store`.

Click on `Develop your own plugin` at the bottom.

Enter your tunnel URL.

Then enter the client id and secret from the .env file:

![Screenshot 2023-05-18 at 2 51 43 PM](https://github.com/etown/chatgpt-plugin-oauth-example/assets/357244/2871b5f7-7adc-4ebd-8279-ca22f5759736)

Then take the verification token and add it to the .env in `VERIFICATION_TOKEN` and save.

![Screenshot 2023-05-18 at 2 56 53 PM](https://github.com/etown/chatgpt-plugin-oauth-example/assets/357244/b95ca00b-8df3-4e77-bf6b-76ab23219d16)

Click `Install for me` and `Login`.

You will be redirected to the NextAuth credentials login page. Enter any username and password. You are then redirected back to ChatGPT and your plugin is now enabled and authenticated!

You can then ask 'What is my username?' in it will invoke the `/api/chatgpt/username.js` route. The authenticated user is retrieved from the bearer token and the username is returned.

![Screenshot 2023-05-18 at 3 05 09 PM](https://github.com/etown/chatgpt-plugin-oauth-example/assets/357244/b095fb65-bc65-4cbe-a4b8-e00eb57e2a7a)
