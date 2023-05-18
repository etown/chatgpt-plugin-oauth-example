export default async function handler(req, res) {

    res.status(200).send(`
    openapi: 3.0.1
    info:
      title: Say My Username 
      description: A plugin that returns the user's username.
      version: 'v1'
    servers:
      - url: ${process.env.HOST}
    paths:
      /api/chatgpt/username:
        post:
          summary: Query
          description: Get the user's username.
          operationId: query_query_post
          requestBody:
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    query:
                      type: string
            required: true
          responses:
            "200":
              description: Successful Response
              content:
                application/json:
                  schema:
                    type: object
                    properties:
                      results:
                        type: array
                        items:
                          type: object
                          properties:
                            text:
                              type: string`);
}