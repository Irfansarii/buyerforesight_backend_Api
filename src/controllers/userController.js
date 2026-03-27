import db from '../config/db.js';

// GET single user by ID
export const getUser = (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "User Not Found" });
        res.json(row);
    });
};

// GET all users logic
export const getAllUsers = (req, res) => {
    const { search, sort, order = 'ASC' } = req.query;
    let sql = "SELECT * FROM users WHERE 1=1";
    let params = [];

    if (search) {
        sql += " AND name LIKE ?";
        params.push(`%${search}%`);
    }

    if (sort) {
        const allowedSort = ['name', 'id'];
        if (allowedSort.includes(sort)) {
            sql += ` ORDER BY ${sort} ${order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
        }
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// CREATE user logic
export const createUser = (req, res) => {
    const { name, email } = req.body;
    db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, email });
    });
};

// UPDATE user logic
export const updateUser = (req, res) => {
    const { name, email } = req.body;
    db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [name, email, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "Update Successful" });
    });
};

// DELETE user logic
export const deleteUser = (req, res) => {
    db.run(`DELETE FROM users WHERE id = ?`, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "User Not Found" });
        res.status(204).send(); 
    });
};