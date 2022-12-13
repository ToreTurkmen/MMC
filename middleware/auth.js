const isLoggedIn = (req, res, next) => {
  let userCookies = req.header("cookie")
  if(userCookies) {
      res.redirect('/')
  }else {
      next()
  }
}

const loggedIn = (req, res, next) => {
  let userCookies = req.header("cookie")
  if(!userCookies) {
     res.redirect('/login')
  } else {
      next()
  }
}

module.exports = {
  isLoggedIn,
  loggedIn
}