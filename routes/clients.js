const router = require('express').Router();

const knex = require('../knex-config');

const authGuard = require('../authGaurd/authGuard')

// Helper function for creating a client
async function createClient(client_name,slogan,location){
    return await knex('clients')
        .insert([{
            client_name: client_name,
            slogan: slogan,
            location: location
        }])
}

// Create User
router.post('/clients/create', authGuard, async(req,res) => {
    let client_name = req.body.client_name
    let slogan = req.body.slogan
    let location = req.body.location

    let createdClient = await createClient(client_name,slogan,location);

    res.json({status: 'success'})
})

// Retrieve User

// Helper function for getting all clients

async function getAllClients(){
    return await knex('clients')
        .select('*')
}

router.get('/clients', async(req,res) =>{
    let all_clients = await getAllClients();
    res.send({status: 'success', data: {clients: all_clients}})
})

// Helper function for getting 1 client
async function getClient(id){
    return await knex
        .select('*')
        .from('clients')
        .where('id',id)
}

router.get('/clients/:id',async(req,res) =>{
    const id = parseInt(req.params.id);
    const client = await getClient(id);

    res.json({status: 'success', data: {client: client}})
})


// TODO : CREATE UPDATE ROUTE
// TODO : CREATE DELETE ROUTE

module.exports = router