# About
A portfolio website built for Jenny Wang using Express, React, and React-Router.

## How to add a project

1. Go to `/public/projects`
2. Add a new project to `settings.json` in the following format:
```ts
{
  "id": {ID: number},
  "title": {TITLE: string},
  "description": {DESCRIPTION: string}
}
```
3. Create a new directory named `ID` within `/public/projects`
4. Add an image file named `ID.jpg` for the thumbnail (square image recommended)
5. Create a markdown file named `ID.md` for the project page itself
6. Make sure to include any image sources in the same `ID` directory
    - When sourcing the images in markdown, make sure to add the prefix `/projects/ID/`

## Installation

```sh
# Confirm node version >= 10.15.0
$ node -v

# Confirm yarn version >= 1.17.3
$ yarn -v

# Clone the repository
$ git clone https://github.com/Rikilele/jenny.wang.git

# Enter the created directory
$ cd jenny.wang

# Set up project
$ yarn setup
```

Then, edit the `.env` file to fit your needs (Required).

## Dev

Recommended for development (http://localhost:3000)

```sh
# Start API server on top level directory
$ yarn dev

# Start client server (new tab)
$ cd client
$ yarn start
```

Checking before deployment (http://localhost:5000)

```sh
# Start server on top level directory
$ yarn start

# Build client views
$ cd client
$ yarn build
```

Linting

```sh
# For both top level directory and /client
$ yarn lint
```

## Sources
- Inspired by [this tutorial](https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3)
- Style Guides (Used for linting)
  * [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript)
  * [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
