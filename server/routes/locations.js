const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const Menu = require("../models/Menu");

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  if(!req.body.country) {
    res.status(400).json({ message: "Field country is required!" });
    return;
  }

  if(!req.body.city) {
    res.status(400).json({ message: "Field city is required!" });
    return;
  }

  if(!req.body.address) {
    res.status(400).json({ message: "Field address is required!" });
    return;
  }

  const location = new Location({
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
  });

  try {
    const savedLocation = await location.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get("/:locationId", async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    res.status(200).json(location);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete("/:locationId", async (req, res) => {
  try {
    const removedLocation = await Location.deleteOne({
      _id: req.params.locationId,
    });
    res.status(200).json(removedLocation);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// router.post("/:locationId/addMenu/:menuId", async (req, res) => {
//   try {
//     const location = await Location.findById(req.params.locationId);
//     const menu = await Menu.findById(req.params.menuId);

//     location.menus.push(menu);

//     const savedLocation = await location.save();
//     res.status(201).json(savedLocation);
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// });

// router.post("/:locationId/removeMenu/:menuId", async (req, res) => {
//   try {
//     const location = await Location.findById(req.params.locationId);
//     const menu = await Menu.findById(req.params.menuId);

//     location.menus.filter(item => item._id != menu._id);

//     const savedLocation = await location.save();
//     res.status(201).json(savedLocation);
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// });

module.exports = router;
