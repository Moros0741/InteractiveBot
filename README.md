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

## 1. Obtaining your VPS (Virtual Private Server)

First things first, we need a VPS to host the code for our bot. You can find cheap VPS's with just a simple google search. Some common VPS Hosting services are: 
    - Digital Ocean
    - Vultr
    - GalaxyGate

Once you have decided on your VPS service, Set up your VPS on your host with Ubuntu or Debian OS Linux distro.  You can open your VPS's terminal and run: 
    ```
    $ apt update
    $ apt upgrade
    ```

Once you have updated and upgraded the packages on your VPS you can run: 
    ```
    $ apt install nodejs
    $ apt install npm
    ```

