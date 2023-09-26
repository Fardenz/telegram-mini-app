module.exports = {
  meta: {
    messages: {
      noCommentsAllowed: "Comments are not allowed!",
    },
  },
  create(context) {
    return {
      Program() {
        const sourceCode = context.getSourceCode()
        const comments = sourceCode.getAllComments()

        comments.forEach((comment) => {
          const reValidComments = /^\s?([/]|eslint)/
          const isInvalidComment = comment && !reValidComments.test(comment.value)

          if (isInvalidComment) {
            context.report({
              node: comment,
              messageId: "noCommentsAllowed",
            })
          }
        })
      },
    }
  },
}
