/* Check if User is Admin */
async function adminOnly(req, res, next) {
  if (req.roles.includes('admin')) {
    next()
  } else {
    return res.status(403).json({ error: 'Admins Only' });
  }
}

module.exports = adminOnly