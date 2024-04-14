const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId

const Venue = require('../models/venue.model')
const {generateCrudMethods} = require ('../services')
const venueCrud = generateCrudMethods(Venue)
const { validateDbId, raiseRecord404Error  } = require('../middlewares');



router.get('/', (req, res, next)=>{
    venueCrud.getAll()
        .then(data=>res.send(data))
        .catch(err=>next(err))
});

router.get('/:id', validateDbId, (req, res, next) => {
    venueCrud.getById(req.params.id)
            .then(data =>{
                if (data) res.send(data)
                else raiseRecord404Error(req, res)

            })
            .catch(err => next(err))   
    })

router.post('/', (req, res, next)=> {
    const newRecord = {
        venueName: req.body.venueName,
        Amenities: req.body.Amenities,        
    }
    venueCrud.create(newRecord)
        .then(data =>res.status(201).json(data))
        .catch(err => next(err))  
})      

router.put('/:id', validateDbId, (req, res) => {
    const updatedVenue = {
        venueName: req.body.venueName,
        Amenities: req.body.Amenities,
    }
    venueCrud.update(req.params.id, updatedVenue)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })
router.delete('/:id', validateDbId, (req, res) => {
    venueCrud.delete(req.params.id)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })

module.exports = router