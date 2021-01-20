const auth = async (req, res, next) => {
  try {
    const id = req.header("x-auth-id");
  
    if (!id)
      return res
        .status(401)
        .json({ msg: "no authentication id,authorization denied" });

    req.admin = id;
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = auth;
