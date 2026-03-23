const router = require("express").Router();
const { register, login, me } = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err); // 🔑 ดู log เพื่อ debug
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/me", auth, me);

module.exports = router;
