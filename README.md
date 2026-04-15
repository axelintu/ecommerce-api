# ecommerce-api
Back end for ecommerce-app front end.

## Installation

Clone this repository and install dependencies
```bash  
git clone git@github.com:axelintu/ecommerce-api.git
cd ecommerce-api
npm install 
```

Copy and rename .env.example to .env and populate the variables
```bash
cp .env.example .env
```
Populate environment variables, run the following command twice and copy and paste the two different results in the JWT_SECRET and JWT_REFRESH_TOKEN.

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Start the project

For development use
```bash
npm run dev
```
