// models/index.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const TaskModel = require('./task');
const TagModel = require('./tag');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

const Task = TaskModel(sequelize);
const Tag = TagModel(sequelize);

// many-to-many
Task.belongsToMany(Tag, { through: 'task_tags', as: 'tags' });
Tag.belongsToMany(Task, { through: 'task_tags', as: 'tasks' });

module.exports = {
  sequelize,
  Task,
  Tag
};