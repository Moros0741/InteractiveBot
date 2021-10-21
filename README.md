# Interactive Trigger Bot

This bot was originally created to help with an Escape room type event in a server I participate in. Due to the increasing interest in the working
of the escape room we agreed to release the bot publicly for open source self hosting. If you are interested in using this bot for your own escape
room or other similar event follow the instructions below to self host the bot. 

## Contributing or Reporting Issues.

To contribute to this bots coding you can fork the repository and make your edits. Once you are satisfied with and tested your edits, you can create a
pull request to request a merge of your edits into the source code of this repository. In your pull request make sure you are explaining exactly what you 
were trying to do, what you did, and what the new changes will do. Mention any new dependencies that may be needed with your edits and of course list any 
new features you've added, if any.

### What makes a great contribution

A Good Contribution is one that benefits the application from a global scope. If you are just looking to add changes for your own version of the bot, then do not
submit a pull request of your changes and just use your forked repository with changes for your bot. 

# Self - Hosting Instructions and Set up. 

Many discord users know about Heroku and the hacks you can use to get a bot running on Heroku. Although this bot would with heroku, albiet with some changes 
we will not be discussing how to host this repo on Heroku, as that is not Heroku's intended use.

## Creating & Inviting a Discord Bot account

To Create a discord bot account you can visit the tutorial [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Once you have created your bot account you can learn about inviting it [here](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#creating-and-using-your-invite-link)

## Obtaining your VPS (Virtual Private Server)

Now that you created and invited your bot, we need a VPS to host the code for our bot. You can find cheap VPS's with just a simple google search. Just a few common VPS Hosting services are: 
    - Digital Ocean
    - Vultr
    - GalaxyGate

Once you have decided on your VPS service, Set up your VPS on your host with Ubuntu or Debian OS Linux distro. You can usually find instructions on your host's support sections. Now that you have your host set up you can open your VPS's terminal login to it using the root user and password provided on your VPS's panel, and run: 
```
    $ apt update
    $ apt upgrade
```

## Installing Requirements & Dependancies

For instructions on how to install NodeJS V16+ on your new VPS [visit here](https://joshtronic.com/2021/05/09/how-to-install-nodejs-16-on-ubuntu-2004-lts/). Once you've installed Node Js you can install `npm` which is NodeJS package manager.
```
    $ apt install npm
```

Once `npm` is installed you can install the database package for the bot which is MongoDB's Mongoose package as well as Discordjs and their sub packages. To learn more about how to set up your own mongoDB database and Cluster [visit here](https://docs.atlas.mongodb.com/tutorial/create-atlas-account/)
```
    $ npm install mongoose -g
```
```
    $ npm install discord.js discord-api-types @discordjs/rest
```

## Cloning the Repository and Editting the config files

Once you have completed the above steps you can clone this repository and edit the `config.json` file to your bot account and server's information. If you don't know how to create a bot account [visit here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Once you have created your bot account you will need to invite it to your server. You can learn about invites [here](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#creating-and-using-your-invite-link)
