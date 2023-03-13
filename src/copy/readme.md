## Introduction

This template is designed to give us a place to start new Carbon Brief interactive pages. 

Type styles and colours are provided through a global style sheet, as are basic layout primitives derived from those outlined in [Every Layout](https://every-layout.dev/layouts/). Common page elements such as headers, footer and so on are ready to go.

The template can accept copy as [Markdown](https://daringfireball.net/projects/markdown/) using [mdsvex](https://mdsvex.com/docs/) and we also provide a mechanism by which you can publish the page quickly and securely to an S3 bucket.

## Starting a new project

### Prerequisits

First things first, you will need these things installed on your computer:
 * NodeJS (best to install this via [nvm](https://github.com/nvm-sh/nvm))
 * A way of dealing with Git repositories (I like the [github desktop app](https://desktop.github.com/))

### Create a new repository

Once you have those things the first thing to do is visit [the github page for this project](https://github.com/carbonbrief/interactive-page-template) and click the beg green "use this template" button (Or, you could [click this link here](https://github.com/carbonbrief/interactive-page-template/generate)).

You'll be presented with a page prompting you to "Create a new repository from interactive-page-template"...

... give your repository a name and a description and then click the "Create repository from template" button.

After watching a loading animation for a bit you should see a your fresh new repository. Click on the "setting" link near the top of the page and then on the settings page scroll down and select "settings" from the left hand menu.

### Configure the repository

We need to add a few secrets to allow for automated publishing:

`PROJECT_PATH` is the folder to which your project will be published so if the url is interactive.carbonbrief.org/special-interactive-page the project path will be __special-interactive-page__.
`AWS_ACCESS_KEY_ID` and  `AWS_SECRET_ACCESS_KEY` are credentials to send files to the S3 bucket. Probably ask Tom G P about this.

> `AWS_ACCESS_KEY_ID` and  `AWS_SECRET_ACCESS_KEY` should never be written down anywhere except within these secrets (even if the repo is private), if that happens by mistake talk to Tom ASAP (even if it's the weekend!).

### Set up the project on your local development machine

Back on the home page of your shiny new GitHub repository click on the "Code" button which will give you the details of how to clone the repo to your local computer (I just click on "Open with GitHub Desktop"). Once the repository has been cloned to your local machine you can go to it in terminal (Or open it in VSCode and use the build in terminal) and type:  `npm install` to add  and then `npm run dev` to start a development server.

### House keeping

At some point you'll need to do the following (preferably before first publishing)
 * remove unwanted routes from `src/routes`
 * remove unwanted images from `static/images`
 * remove unused data sources from `static/data`

### Publishing

