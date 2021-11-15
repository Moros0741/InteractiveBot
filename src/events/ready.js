/* This event fires whenever the bot connects to Discord. Prints to the console
that the bot has signed into discord and under the specified account with the 
specified ID. Also sets the activity and status of the bot. 

TO CHANGE THE ACTIVITY: 
Change: 
await client.user.setActivity("status you want" {type: "type you want"});

Accepted types:
await client.user.setActivity("Your Status Message", {type: 'WATCHING'})
await client.user.setActivity("Your Status Message", {type: 'PLAYING'})
await client.user.setActivity("Your Status Message", {type: 'LISTENING'})
await client.user.setActivity("Your Status Message", {type: 'COMPETING'})
await client.user.setActivity("Your Status Message", {type: 'STREAMING'})

To change the bots status presence. Whether it appears online, idle, dnd, or invisible; change:

await client.user.setStatus('idle')

to whatever you want. Accepted types are: 

await client.user.setStatus('online')
await client.user.setStatus('idle')
await client.user.setStatus('dnd')
await clien.user.setStatus('invisible')
*/

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Client has logged into discord with account: ${client.user.tag}`);
    console.log(`With ID: ${client.user.id}`);
    await client.user.setActivity("triggers", {type: 'LISTENING'});
    await client.user.setStatus('idle');
  },
};
