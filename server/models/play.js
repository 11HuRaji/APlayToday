const db = require('../database/connect');

class Play {
    constructor(name, summary, length, time) {
        this.name = name;
        this.summary = summary;
        this.length = length;
        this.time = time;
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM play');
        if (response.rows.length === 0) {
            throw new Error('No Plays found')
        }
        return response.rows;
    }
}

module.exports = Play;
