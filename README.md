## Running the project
1. install dependencies by running `yarn`
2. in packages/backend you need to provide a `.env` file that looks like this 
    ```
    DB_URL=
    JWT_SECRET=
    SENDGRID_API_KEY=
    SENDER_EMAIL_ADDR=
    NEWS_API_KEY=
    ```
3. Then run `yarn dev:backend` or `yarn dev:frontend`
