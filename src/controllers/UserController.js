const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Add = require('../models/Add')
const { validationResult, matchedData } = require('express-validator');
const mongoose = require('mongoose');

module.exports = {
    getStates: async (req, res) => {
        let states = await State.find();
        res.json({ states });
    },
    info: async (req, res) => {
        let token = req.query.token;
        //let { token } = req.query;
        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const ads = await Add.find({ idUser: user._id.toString() });

        let adList = [];
        for (let i in ads) {
            const cat = await Category.findById(ads[i].category);

            adList.at.push({
                id: ads[i]._id,
                status: ads[i].status,
                images: ads[i].images,
                dateCreated: ads[i], dateCreated,
                title: ads[i].title,
                price: ads[i].price,
                priceNegociable: ads[i].priceNegociable,
                description: ads[i].description,
                views: ads[i].views,
                category: cat.slug
            });

            // adList.push({ ...ads[i], category: cat.slug });
        }
        res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList
        })
    },
    editAction: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() })
            return;
        }
        const data = matchedData(req);
        let updates = {};
        if (data.name) {
            updates.name = data.name;
        }
        if (data.email) {
            const emailCheck = await User.findOne({ email: data.email });
            if (emailCheck) {
                res.json({ error: 'Email já existente!' });
                return;
            }
            updates.email = data.email;
        }
        if (data.state) {
            if (mongoose.Types.ObjectId.isValid(data.state)) {
                const stateCheck = await State.findById(data.state);
                if (!stateCheck) {
                    res.json({ error: 'Estado não existe' });
                    return;
                }
                updates.state = data.state;
            } else {
                res.json({ error: 'Código do Estado inválido' });
                return;
            }
        }
        if (data.password) {
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }
        await User.findOneAndUpdate({ token: data.token }, { $set: updates })
    }
}