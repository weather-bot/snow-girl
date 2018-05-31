const whiteList = require('./white_list.json');

module.exports = (robot) => {

  robot.log('Yay, the app was loaded!')

  robot.on('issue_comment.created', async context => {

    let params;
    if (whiteList.indexOf(context.payload.issue.user.login) != -1) {
      if (context.payload.comment.body.includes("/bot try")) {
        params = context.issue({
          body: "New build is in process!"
        })
      }
    } else {
      params = context.issue({
        body: "You don't authority!"
      })
    }

    context.github.issues.createComment(params)
  })

}