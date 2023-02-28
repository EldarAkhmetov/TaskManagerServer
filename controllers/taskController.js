const { Task } = require('../models/models')
const ApiError = require('../error/ApiError');

class TaskController {
    async create(req, res, next) {
        try {
            console.log(req.body);
            const {name, email, description} = req.body;
            const task = await Task.create({
                name,
                email,
                description,
                is_active: true,
                is_edited: false
            });
            return res.json(task);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const task = await Task.findOne(
                {where: {id}}
            );
            return res.json(task);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
        
    }

    async getAll(req, res) {
        let { page, limit, sortByName, sortByEmail, sortByStatus } = req.query;
        page = page || 1;
        limit = limit || 3;
        const order = [];
        if (sortByName) order.push(['name', sortByName]);
        if (sortByEmail) order.push(['email', sortByEmail]);
        if (sortByStatus) order.push(['is_active', sortByStatus]);
        const offset = page * limit - limit;
        return res.json(await Task.findAndCountAll({ limit, offset, order }));
    }

    async updateOne(req, res, next) {
        try {
            const {id, description, is_active} = req.body;
            const task = await Task.findOne(
                {where: {id}}
            );

            await task.update({ description, is_active, is_edited: task.is_edited || task.description !== description });
            return res.json(task);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TaskController()