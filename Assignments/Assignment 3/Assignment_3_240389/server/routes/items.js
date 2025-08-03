const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { supabase } = require("../supabaseClient");

// Get all items
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("items").select("*");
  res.status(error ? 500 : 200).json(error || data);
});

// Post new item (auth)
router.post("/", verifyToken, async (req, res) => {
    const { title, description, location, date, contact, status, image } = req.body;
    const { email } = req.user;
  
    const { data, error } = await supabase.from("items").insert([
      {
        title,
        description,
        location,
        date,
        contact,
        status,
        image,
        user_email: email
      }
    ]);
  
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  
    res.status(201).json(data);
  });

// Update item (auth)
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  // Make sure it's user's item
  const { data: existing } = await supabase.from("items").select("user_email").eq("id", id).single();
  if (!existing || existing.user_email !== email) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabase.from("items").update(req.body).eq("id", id);
  res.status(error ? 500 : 200).json(error || data);
});

// Delete item (auth)
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const { data: existing } = await supabase.from("items").select("user_email").eq("id", id).single();
  if (!existing || existing.user_email !== email) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabase.from("items").delete().eq("id", id);
  res.status(error ? 500 : 200).json(error || data);
});

module.exports = router;