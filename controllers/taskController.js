// controllers/taskController.js
const { Task, Tag } = require('../models');
const { Op } = require('sequelize');

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date, tags } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    const task = await Task.create({ title, description, status, priority, due_date });

    if (Array.isArray(tags) && tags.length) {
      const tagInstances = await Promise.all(tags.map(async (t) => {
        const [tag] = await Tag.findOrCreate({ where: { name: t } });
        return tag;
      }));
      await task.setTags(tagInstances);
    }

    const result = await Task.findByPk(task.id, { include: { model: Tag, as: 'tags', through: { attributes: [] } } });
    return res.status(201).json(result);
  } catch (err) {
    console.error('createTask error:', err);
    return res.status(500).json({ error: 'Failed to create task' });
  }
};

const getTasks = async (req, res) => {
  try {
    const { status, priority, tag, search, page = 1, limit = 20 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = Number(priority);

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const include = [{ model: Tag, as: 'tags', through: { attributes: [] } }];
    if (tag) include[0].where = { name: tag };

    const offset = (Number(page) - 1) * Number(limit);

    const tasks = await Task.findAll({
      where,
      include,
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset,
    });

    return res.json(tasks);
  } catch (err) {
    console.error('getTasks error:', err);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: { model: Tag, as: 'tags', through: { attributes: [] } } });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    return res.json(task);
  } catch (err) {
    console.error('getTaskById error:', err);
    return res.status(500).json({ error: 'Failed to fetch task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date, tags } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.update({ title, description, status, priority, due_date });

    if (Array.isArray(tags)) {
      const tagInstances = await Promise.all(tags.map(async (t) => {
        const [tag] = await Tag.findOrCreate({ where: { name: t } });
        return tag;
      }));
      await task.setTags(tagInstances);
    }

    const result = await Task.findByPk(task.id, { include: { model: Tag, as: 'tags', through: { attributes: [] } } });
    return res.json(result);
  } catch (err) {
    console.error('updateTask error:', err);
    return res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    await task.destroy(); // soft-delete because paranoid: true
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('deleteTask error:', err);
    return res.status(500).json({ error: 'Failed to delete task' });
  }
};

const addTagsToTask = async (req, res) => {
  try {
    const { tags } = req.body;
    if (!Array.isArray(tags) || !tags.length) return res.status(400).json({ error: 'tags array required' });

    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const tagInstances = await Promise.all(tags.map(async (t) => {
      const [tag] = await Tag.findOrCreate({ where: { name: t } });
      return tag;
    }));

    await task.addTags(tagInstances);

    const result = await Task.findByPk(task.id, { include: { model: Tag, as: 'tags', through: { attributes: [] } } });
    return res.json(result);
  } catch (err) {
    console.error('addTagsToTask error:', err);
    return res.status(500).json({ error: 'Failed to add tags' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  addTagsToTask,
};