module.exports = {
  getIndex: (req, res) => {
    // render index.ejs and respond with html back to client
    res.render("index.ejs");
  },
};
