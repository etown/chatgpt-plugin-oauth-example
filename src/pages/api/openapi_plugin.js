export default async function handler(req, res) {

  const openApiDefinition = {
    "schema_version": "v1",
    "name_for_model": "username",
    "name_for_human": "Say My Username",
    "description_for_model": "Plugin for the retrieving the user's username.",
    "description_for_human": "Access to your username.",
    "auth": {
      "type": "oauth",
      "client_url": `${process.env.HOST}/api/oauth/authorize`,
      "authorization_url": `${process.env.HOST}/api/oauth/token`,
      "scope": "search:read",
      "authorization_content_type": "application/x-www-form-urlencoded",
      "verification_tokens": {
        "openai": process.env.VERIFICATION_TOKEN
      }
    },
    "api": {
      "url": `${process.env.HOST}/openapi.yaml`,
      "has_user_authentication": true,
      "type": "openapi"
    },
    "logo_url": `${process.env.HOST}/logo.png`,
    "contact_email": "hi@test.ai",
    "legal_info_url": "hi@test.ai"
  };

  res.status(200).json(openApiDefinition);
}
