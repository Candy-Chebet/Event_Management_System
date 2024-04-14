const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId

const Event = require('../models/event.model')
const {generateCrudMethods} = require ('../services/')
const eventCrud = generateCrudMethods(Event)
const { validateDbId, raiseRecord404Error  } = require('../middlewares/');



router.get('/', (req, res, next)=>{
    eventCrud.getAll()
        .then(data=>res.send(data))
        .catch(err=>next(err))
});

router.get('/:id', validateDbId, (req, res, next) => {
        eventCrud.getById(req.params.id)
            .then(data =>{
                if (data) res.send(data)
                else raiseRecord404Error(req, res)

            })
            .catch(err => next(err))   
    })

router.post('/', (req, res, next)=> {
    const newRecord = {
        eventName: req.body.eventName,
        location: req.body.location,
        ticket: req.body.ticket,
        date: req.body.date,
        time:req.body.time,
        
    }
    eventCrud.create(newRecord)
        .then(data =>res.status(201).json(data))
        .catch(err => next(err))  
})      

router.put('/:id', validateDbId, (req, res, next) => {
    const updatedEvent = {
        eventName: req.body.eventName,
        location: req.body.location,
        ticket: req.body.ticket,
        date: req.body.date,
        time: req.body.time,
    };
    eventCrud.update(req.params.id, updatedEvent)
        .then(data => {
            if (data) res.send(data);
            else raiseRecord404Error(req, res);
        })
        .catch(err => next(err));
});

router.delete('/:id', validateDbId, (req, res, next) => {
    eventCrud.delete(req.params.id)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })

module.exports = router