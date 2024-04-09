const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId

const Attendee = require('../models/attendee.model')
const {generateCrudMethods} = require ('../services/')
const attendeeCrud = generateCrudMethods(Attendee)
const { validateDbId, raiseRecord404Error  } = require('../middlewares/');



router.get('/', (req, res, next)=>{
    attendeeCrud.getAll()
        .then(data=>res.send(data))
        .catch(err=>next(err))
});

router.get('/:id', validateDbId, (req, res, next) => {
    attendeeCrud.getById(req.params.id)
            .then(data =>{
                if (data) res.send(data)
                else raiseRecord404Error(req, res)

            })
            .catch(err => next(err))   
    })

router.post('/', (req, res, next)=> {
    const newRecord = {
        attendeeName: req.body.attendeeName,
        eventName: req.body.location,
        date: req.body.date,
        
    }
    attendeeCrud.create(newRecord)
        .then(data =>res.status(201).json(data))
        .catch(err => next(err))  
})      

router.put('/:id', validateDbId, (req, res) => {
    const updatedAttendee = {
        attendeeName: req.body.attendeeName,
        eventName: req.body.eventName,
        date: req.body.date,
        
    }
    attendeeCrud.update(req.params.id, updatedAttendee)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })
router.delete('/:id', validateDbId, (req, res) => {
    attendeeCrud.delete(req.params.id)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })

module.exports = router