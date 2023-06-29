const db = require('../database/connect')

class Plays {

    constructor ({ name, summary, length, time}) {
        this.name = name;
        this.summary = summary;
        this.length = length;
        this.time = time;
    }

    static async getAllPlays() {
        const response = await db.query("SELECT * FROM play ORDER BY name;");
        if (response.rows.length === 0) {
            throw new Error("No plays available.")
        }
        return response.rows.map(g => new Play(g));
    }

    static async getTopSnack() {
        const response = await db.query("SELECT * FROM snack LIMIT 1 ORDER BY votes DESC;");
        if (response.rows.length != 1) {
            throw new Error("Unable to locate snack.")
        }
        return new Snack(response.rows[0]);
    }

    static async getOneById(id) {
        const query = "SELECT * FROM snack WHERE snack_id = $1"
        const values = id;
        const response = await db.query(query, [values])
        if (response.rows.length != 1){
            throw new Error("Unable to locate snack")
        }
        return new Snack(response.rows[0]);
    }

    static async create(data) {
        const { snack_name, snack_description, healthy = false, vegetarian = false, votes } = data;
        console.log(snack_name)
        const query = 'INSERT INTO snack (snack_name, snack_description, healthy, vegetarian) VALUES ($1, $2, $3, $4) RETURNING *;'
        const values = [snack_name, snack_description, healthy, vegetarian, votes]
        const response = await db.query(query, values);
        const snackId = response.rows[0].snack_id;
        const newSnack = await Snack.getOneById(snackId);
        return newSnack;
    }

    static async update(data) {
        const response = await db.query("PATCH snack SET votes = $1 RETURNING snack_id, votes;",
            [ this.votes + parseInt(data.votes), this.id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update votes.")
        }
        return new Snack(response.rows[0]);
    }

    static async destroy() {
        const response = await db.query('DESTROY FROM snack WHERE snack_id = $1 RETURNING *;', [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete snack.")
        }
        return new Snack(response.rows[0]);
    }
}

module.exports = Play;
