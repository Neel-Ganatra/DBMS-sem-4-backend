import express from "express";
import cors from "cors";
// import jwt from "jsonwebtoken"
import con from "../utils/db.js";
import { join } from "path";
// import con from "../utlis/db.js"

// import express from "express";
// import cors from "cors";
// import jwt from "jsonwebtoken"
// import con from "../utlis/db.js"
// import multer from "multer";

const router = express.Router();
// const secretKey="jwt_secret_key"
router.use(cors());
// router.use(cors({
//     origin: ['http://localhost:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }))

// router.get('/', (req, res) => {
//     res.send("admin")

// })
router.get("/ball", (req, res) => {
  const sql = "SELECT * FROM ball LIMIT 10";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: "Failed", error: "Error in query" });
    return res.json({ status: "Success", data: result });
  });
});

router.get("/continent", (req, res) => {
  const sql = "SELECT * FROM continent";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: "Failed", error: "Error in query" });
    return res.json({ status: "Success", data: result });
  });
});

router.delete("/continent/:id", (req, res) => {
  const continentId = req.params.id;
  const sql = "DELETE FROM continent WHERE id = ?";
  con.query(sql, continentId, (err, result) => {
    if (err) {
      console.error("Error deleting continent:", err);
      return res.json({ status: "Failed", error: "Error in query" });
    }
    return res.json({ status: "Success", data: result });
  });
});

router.get("/continent/:id", (req, res) => {
  let id = req.params.id;
  id = id.replace(/\D/g, "");
  const sql = "SELECT * FROM continent WHERE id = ?";
  console.log(id);
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ status: "Failed", error: "Error in query" });
    return res.json({ status: "Success", data: result });
  });
});
router.put("/continent/:id", (req, res) => {
  let id = req.params.id;
  id = id.replace(/\D/g, "");
  const name = req.body.name;
  const values = [name, id];
  const sql = "UPDATE continent SET name = ? WHERE id = ?";
  con.query(sql, values, (err, result) => {
    if (err)
      return res.json({ status: "Failed", error: "Error in query" + err });
    return res.json({ status: "Success", data: result });
  });
});

router.post("/continent", (req, res) => {
  const name = req.body.name;
  const values = [name];
  const sql = "INSERT INTO continent (name) VALUES (?)";
  con.query(sql, values, (err, result) => {
    if (err)
      return res.json({ status: "Failed", error: "Error in query" + err });
    return res.json({ status: "Success", data: result });
  });
});

router.get("/country", (req, res) => {
  const sql =
    "SELECT country.*, continent.name AS continentName FROM country INNER JOIN continent ON country.continentId = continent.id";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ status: "Failed", error: "Error in query" });
    }
    // Remove the continent ID from the result set
    //  result.forEach(country => delete country.id);
    return res.json({ status: "Success", data: result });
  });
});

router.get("/country/:id", (req, res) => {
  let id = req.params.id;
  id = id.replace(/\D/g, "");
  const sql = "SELECT * FROM country WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ status: "Failed", error: "Error in query" });
    return res.json({ status: "Success", data: result });
  });
});

router.post("/country", (req, res) => {
  const name = req.body.name;
  const continent_id = req.body.continent_id;
  console.log(name, continent_id);
  const values = [name, continent_id];
  const sql = "INSERT INTO country (name, continentId) VALUES (?, ?)";
  con.query(sql, values, (err, result) => {
    if (err)
      return res.json({ status: "Failed", error: "Error in query" + err });
    return res.json({ status: "Success", data: result });
  });
});

router.delete("/country/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const sql = "DELETE FROM country WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting country:", err);
      return res.json({ status: "Failed", error: "Error in query" });
    }
    return res.json({ status: "Success", data: result });
  });
});

router.put("/country/:id", (req, res) => {
  let id = req.params.id;
  id = id.replace(/\D/g, "");
  const name = req.body.name;
  const values = [name, id];
  const sql = "UPDATE country SET name = ? WHERE id = ?";
  con.query(sql, values, (err, result) => {
    if (err)
      return res.json({ status: "Failed", error: "Error in query" + err });
    return res.json({ status: "Success", data: result });
  });
});

router.get("/player", (req, res) => {
  const sql =
    "SELECT player.*, player_role.roles  FROM player INNER JOIN player_role ON player.Role = player_role.id LIMIT 10";

  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ status: "Failed", error: "Error in query" + err });
    }
    // Remove the role ID from the result set
    //  result.forEach(player => delete player.Role);
    return res.json({ status: "Success", data: result });
  });
});

router.post("/player", (req, res) => {
  const {
    firstname,
    lastname,
    fullname,
    Role,
    gender,
    dob,
    country,
    battingstyle,
    bowlingstyle,
  } = req.body;
  console.log(Role);
  console.log(
    firstname,
    lastname,
    fullname,
    Role,
    gender,
    dob,
    country,
    battingstyle,
    bowlingstyle
  );

  // Create an array of values without wrapping it in another array
  const values = [
    firstname,
    lastname,
    fullname,
    Role,
    gender,
    dob,
    country,
    battingstyle,
    bowlingstyle,
  ];

  const sql =
    "INSERT INTO player (firstname,lastname,fullname,Role,gender,dob,countryId,battingstyle,bowlingstyle) VALUES (?,?,?,?,?,?,?,?,?)";

  con.query(
    sql,
    [
      firstname,
      lastname,
      fullname,
      Role,
      gender,
      dob,
      country,
      battingstyle,
      bowlingstyle,
    ],
    (err, result) => {
      if (err)
        return res.json({ status: "Failed", error: "Error in query" + err });
      return res.json({ status: "Success", data: result });
    }
  );
});

router.delete("/player/:id", (req, res) => {
  const playerId = req.params.id;
  const sql = "DELETE FROM player WHERE id = ?";
  con.query(sql, playerId, (err, result) => {
    if (err) {
      console.error("Error deleting player:", err);
      return res.json({ status: "Failed", error: "Error in query" });
    }
    return res.json({ status: "Success", data: result });
  });
});

router.get("/player_role", (req, res) => {
  const sql = "SELECT * FROM player_role";

  con.query(sql, (err, result) => {
    if (err) return res.json({ status: "Failed", error: "Error in query" });
    return res.json({ status: "Success", data: result });
  });
});

router.post("/player_role", (req, res) => {
  const roles = req.body.roles;
  const values = [roles];
  const sql = "INSERT INTO player_role (roles) VALUES (?)";
  con.query(sql, values, (err, result) => {
    if (err)
      return res.json({ status: "Failed", error: "Error in query" + err });
    return res.json({ status: "Success", data: result });
  });
});

router.get("/player_role/:id", (req, res) => {
  const playerRoleId = req.params.id;
  const sql = "SELECT * FROM player_role WHERE id = ?";
  con.query(sql, playerRoleId, (err, result) => {
    if (err) return res.json({ status: "Failed", error: "Error in query" });
    return res.json({ status: "Success", data: result });
  });
});

router.delete("/player_role/:id", (req, res) => {
  const playerRoleId = req.params.id;
  const sql = "DELETE FROM player_role WHERE id = ?";
  con.query(sql, playerRoleId, (err, result) => {
    if (err) {
      console.error("Error deleting player role:", err);
      return res.json({
        status: "Failed",
        error: "Error in query",
        message: err.message,
      }); // Include the error message in the response
    }
    if (result.affectedRows === 0) {
      // No rows affected, meaning no record found for the given ID
      return res.json({
        status: "Failed",
        error: "No record found for the given ID",
      });
    }
    return res.json({
      status: "Success",
      message: "Player role deleted successfully",
    });
  });
});

router.put("/edit_role/:id", (req, res) => {
  let id = req.params.id;
  id = id.replace(/\D/g, "");
  const roles = req.body.roles;
  const sql = "UPDATE player_role SET roles = ? WHERE id = ?";
  con.query(sql, [roles, id], (err, result) => {
    if (err)
      return res.json({ status: "Failed", error: "Error in query" + err });
    return res.json({ status: "Success", data: result });
  });
});

router.get("/officials", (req, res) => {
  const sql =
    "SELECT officials.*, country.name as country_name FROM officials LEFT JOIN country ON officials.country = country.id";

  con.query(sql, (err, result) => {
    if (err) return res.json({ status: "Failed", error: "Error in query" });
    return res.json({ status: "Success", data: result });
  });
});

router.put("/officials/:id", (req, res) => {
  let id = req.params.id;
  id = id.replace(/\D/g, "");
  const { country, firstname, lastname, fullname, dob, gender } = req.body;
  // console.log("Received update request for ID:", id);
  const sql =
    "UPDATE officials SET country = ?, firstname = ?, lastname = ?, fullname = ?, dateOfBirth = ?, gender = ? WHERE id = ?";
  // console.log("SQL Query:", sql);
  con.query(
    sql,
    [country, firstname, lastname, fullname, dob, gender, id],
    (err, result) => {
      if (err) {
        console.error("Error in query:", err);
        return res
          .status(500)
          .json({ status: "Failed", error: "Error in database query" });
      }
      console.log("Rows affected:", result.affectedRows);
      return res.json({ status: "Success", data: result });
    }
  );
});

router.post("/officials", (req, res) => {
  const { country, firstname, lastname, fullname, dob, gender } = req.body;
  const sql =
    "INSERT INTO officials (country, firstname, lastname, fullname, dateOfBirth, gender) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(
    sql,
    [country, firstname, lastname, fullname, dob, gender],
    (err, result) => {
      if (err) {
        console.error("Error in query:", err);
        return res
          .status(500)
          .json({ status: "Failed", error: "Error in database query" + err });
      }
      return res.status(201).json({ status: "Success", data: result });
    }
  );
});

export { router as adminRouter };
