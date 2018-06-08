const execSync = require('child_process').execSync;
const whiteList = require('./white_list.json');

module.exports = (robot) => {

  robot.log('Yay, the app was loaded!')

  robot.on('issue_comment.created', async context => {
    robbot.log('new issue_comment!')
    let params;
    if (whiteList.indexOf(context.payload.issue.user.login) != -1) {
      if (context.payload.comment.body.includes("bot try")) {
        robbot.log('New try start!')        
        params = context.issue({
          body: "New build is in process!"
        })
        await context.github.issues.createComment(params);

        try {
          const prId = context.payload.issue.html_url.split("pull/")[1];
          const command = `sh deploy.sh ${prId}`;
          execSync(command);
          params = context.issue({
            body: `The build for PR(#${prId}) is successful.`
          })
        } catch (exceptions) {
          params = context.issue({
            body: "Build Exceptions."
          })
        }
        await context.github.issues.createComment(params);
      }
    } else {
      params = context.issue({
        body: "You don't authority!"
      })
      await context.github.issues.createComment(params)
    }
  })

}
