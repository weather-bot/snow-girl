const execSync = require('child_process').execSync;
const whiteList = require('./white_list.json');

module.exports = (robot) => {

  robot.log('Yay, the app was loaded!')

  robot.on('issue_comment.created', async context => {
    const prId = context.payload.issue.html_url.split("pull/")[1];
    let params;

    if (whiteList.indexOf(context.payload.issue.user.login) != -1) {
      if (context.payload.comment.body.includes("/bot try")) {
        params = context.issue({
          body: "New build is in process!"
        })
        context.github.issues.createComment(params);

        try {
          const command = `sh deploy.sh ${prId}`;
          execSync(command);
          params = context.issue({
            body: `The build for PR#${prId} is success.`
          })
        } catch (exceptions) {
          params = context.issue({
            body: "Build Exceptions."
          })
        }
        context.github.issues.createComment(params);
      }
    } else {
      params = context.issue({
        body: "You don't authority!"
      })
      context.github.issues.createComment(params)
    }
  })

}
