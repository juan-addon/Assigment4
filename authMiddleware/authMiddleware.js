const authControl = {};

authControl.requireAuth = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    next();
  } else {
    res.redirect("/login");
  }
};

authControl.DriverAuth = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    if (user?.userType == "Driver") {
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};

authControl.UnauthorizedRoute = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.redirect("/");
  } else {
    next();
  }
};

authControl.LicenseNumberDefaultRoute = (req, res, next) => {
  const user = req.session.user;

  if (user) {
    if (user?.userType == "Driver") {
      if (user?.licenseNumber == "") {
        res.redirect("/g2_page");
      } else {
        next();
      }
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};

authControl.AdminPages = (req, res, next) => {
  const user = req.session.user;

  if (user) {
    if (user?.userType == "Admin") {
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};

module.exports = authControl;
