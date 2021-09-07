module.exports = function (app) {
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none')
    next()
  })
}
