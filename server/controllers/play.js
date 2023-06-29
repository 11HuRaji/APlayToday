const Play = require('../models/play')

class PlayController{
    static async getAllPlays(req, res){
        try{
            const data = await Play.getAllPlays()
            res.status(200).json(data)
        }catch (error) {
            console.log(error)
            res.status(500).json({error: `Internet Server Error - ${error}`})
        }
    }

    static async createPlay(req, res){
        const country = req.body
        try{
            const newCountry = await Country.createCountry(country)
            res.status(201).json(newCountry)
        }catch (error){
            res.status(500).json({Error: `Error - ${error}`})
        }
    }
    static async getCountryById(req,res){
        const { id } = req.params
        try{
            const country = await Country.getCountryById(id)
            if(country){
                res.status(200).json(country)
            }else{
                res.status(404).json({error: `Country not found!`})
            }
        }catch(error){
            res.status(500).json({error: `opps something went wrong - ${error}`})
        }
    }

    static async updateCountry(req,res){
        const { id } = req.params
        const newCountry = req.body
        try{
            const country = await Country.updateCountry(id, newCountry)
            if(country){
                res.status(200).json(country)
            }else{
                res.status(404).json({error: `Country not found!`})
            }
        }catch(error){
            res.status(500).json({error: `opps something went wrong - ${error}`})
        }
    }

    static async deleteCountry(req, res){
        const { id } = req.params
        try{
            await Country.deleteCountry(id)
            res.status(204).end()
        }catch(error){
            res.status(500).json({Error: `Error code - ${error}`})
        }
    }
}

module.exports = CountryController
