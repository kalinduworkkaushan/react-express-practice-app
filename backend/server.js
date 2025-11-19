import { db } from './db.js';

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());



app.get('/users', async(req,res)=> {
    try{
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    
    }catch (err) {
        console.error(err);
        res.status(500).json({error: "Database error"});
    }
    });


app.post('/users', async (req, res) => {
    const {name, email} = req.body;
    
    await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);


    res.json({message: " user added succesfully"});
}
);


app.put("/users/:id", async(req,res) => {
  try{
    const {id} = req.params;
    const {name, email} = req.body;

    const [result] = await db.query("UPDATE users SET name=?, email=? WHERE idusers=?", [name, email, id]);



if (result.affectedRows === 0) {
    return res.status(404).json({error: "User not found"});
}

res.json({message: "User updated successfully"});
} catch(err) {
    console.error(err);
    res.status(500).json({error: "Database error"});
}
});


app.get("/user/:id", async(req, res) => {
try{
    const {id} = req.params;
    const [rows] =  await db.query("SELECT * FROM users WHERE idusers=?", [id])

    if (rows.length === 0) {
        return res.status(404).json({error: "User not found"});
    }

    res.json(rows[0]);
} catch (err) {
    console.error(err);
    res.status(500).json({error: "Database error"});
}
});



app.delete("/user/:id", async(req, res) => {
    try{
        const {id} = req.params;

        const [rows] = await db.query("DELETE FROM users WHERE idusers=?", [id]);
        if (rows.affectedRows === 0) {
            res.json("message: No users found to delete");
        }

        res.json({message: "User deleted successfully"});
    } catch (err) {
        res.status(500).json({error: "Database error"});
    }
});


app.listen(5000, ()=> {
    console.log("Backend running on port 5000");
});