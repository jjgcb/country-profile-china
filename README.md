# Interactive page template

This is the beginning of a template from which to build Carbon Brief interactive pages.

Pre-requisites:
  * [Node JS](https://nodejs.org/en/) V16.x

## Developing locally
Check out this repo to your computer.

From the command line, in the repo's local directory:

Install all the dependencies
`npm i` 

If you want to develop `npm run dev` will start a local development server, this should automattically refresh your browser as you make changes to svelte components.

If you want to build the project `npm run build` will create a build directory with a collection of HTML/CSS/JS files in. The goal is that the sites should by default be completely static i.e. they could be served from an S3 bucket with no difficulty.

## Deploying
The idea is that projects built with this template will be published via Github actions to make it easy to keep track of changes and to help avoid fat-finger errors

[This is not working right now](https://github.com/carbonbrief/interactive-page-template/actions)

## TODO list
 * create TODO list