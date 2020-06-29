const router = require('express').Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const knex = require('../knex-config');

// Helper Function to save User Data
async function saveData(first_name,last_name,email,password){
    return await knex('users')
        .insert([
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            }
        ]);
};

router.post('/register', (req,res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
    let hash = bcrypt.hashSync(password);

    saveData(first_name,last_name,email, hash);

    res.send(`Registered ${first_name}, ${last_name}, ${email}`)
})

// Helper Function For Comparing a Password Hash

async function comparePass(password,passHash){
    const passMatch = await bcrypt.compare(password, passHash);

    if (passHash){
        return passHash
    } else{
        return 'Auth Failed'
    }
}


// Login Route
router.post('/login',(req,res) => {
    knex('users')
    .where({email: req.body.email})
    .select('password','email','first_name')
    .then(function(result){
        if(!result || !result[0]){
            return 'Auth Failed'
        }
        let verfiedPass = comparePass(req.body.password, result[0].password);

        if (verfiedPass){
            let token = jwt.sign({
                email: result[0].email,
                first_name: result[0].first_name,
                time: new Date().toLocaleTimeString()
            }, process.env.JWT_SECRET, {
                expiresIn: '1hr'
            })
            res.send({status: 'success', token: token})
        } else{
            res.send({status: 'Auth Failed'})
        }
    })
})

module.exports = router