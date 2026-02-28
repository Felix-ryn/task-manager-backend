// scripts/seed.js
require('dotenv').config();

const path = require('path');
const { sequelize, Task, Tag } = require(
  path.join(__dirname, '..', 'models')
);

async function seed() {
  console.log(' Connecting to database...');
  await sequelize.authenticate();
  console.log(' Database connected');

  console.log(' Syncing database...');
  await sequelize.sync({ force: true }); 
  console.log(' Database synced');

  //  TAGS 
  const tagNames = ['backend', 'study', 'urgent', 'personal'];
  const tags = await Promise.all(
    tagNames.map(name => Tag.create({ name }))
  );

  //  TASK 1 
  const t1 = await Task.create({
    title: 'Belajar Express',
    description: 'Belajar membuat REST API dengan Express',
    status: 'todo',
    priority: 2,
    due_date: '2026-03-05T12:00:00Z'
  });
  await t1.setTags([tags[0], tags[1]]);

  //  TASK 2 
  const t2 = await Task.create({
    title: 'Tugas Matematika',
    description: 'Selesaikan soal UTS',
    status: 'in_progress',
    priority: 3,
    due_date: '2026-03-02T09:00:00Z'
  });
  await t2.setTags([tags[2]]);

  //  TASK 3 
  const t3 = await Task.create({
    title: 'Beli bahan makanan',
    description: 'Beras, telur, sayur',
    status: 'todo',
    priority: 4,
    due_date: '2026-02-28T18:00:00Z'
  });
  await t3.setTags([tags[3]]);

  console.log(' Seed database BERHASIL');
  process.exit(0);
}

seed().catch(err => {
  console.error(' Seed gagal:', err);
  process.exit(1);
});