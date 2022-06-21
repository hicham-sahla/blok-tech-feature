const Profile = require("../models/User");

const user_index = (req, res) => {
  Profile.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("users/index", {
        title: "Bekijk gebruikers in je buurt",
        profiles: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_details = (req, res) => {
  const id = req.params.id;
  Profile.findById(id)
    .then((result) => {
      res.render("users/details", { profile: result, title: "Gebruiker details" });
    })
    .catch((err) => {
      res.status(404).render("pages/404", { title: "Gebruiker niet gevonden" });
    });
};

const user_create_get = (req, res) => {
  res.render("users/create", {
    title: "Vul je gegevens in",
  });
};

const user_create_post = (req, res) => {
  const profile = new Profile(req.body);

  profile
    .save()
    .then((result) => {
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete = (req, res) => {
  const id = req.params.id;

  Profile.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/users" });
    })
    .catch((err) => {
      console.log(err);
    });
};
// const user_update = (req, res) => {

//   User.findOneAndUpdate()
//     .then((result) => {
//       res.redirect("/users");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

module.exports = {
  user_index,
  user_details,
  user_create_get,
  user_create_post,
  user_delete,
  // user_update,
};
