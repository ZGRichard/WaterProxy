import 'reflect-metadata';

import { pick } from 'lodash';
import { getRepository } from 'typeorm';

import { Task } from './entity/Task';
import handler from './handler';

type Changes = Record<
  string,
  { created: any[]; updated: any[]; deleted: string }
>;

const entitiesMap = {
  tasks: Task,
};

async function push(req, res) {
  console.log("body", req.body);

  Object.entries(req.body as Changes).forEach(([key, entityChanges]) => {
    console.log("key", key);

    const Entity = entitiesMap[key];

    if (!Entity) return;

    const entityRepository = getRepository(Entity);

    if (entityChanges.created.length) {
      entityChanges.created.forEach(async (entityData) => {
        const res = await entityRepository.create(entityData);
        await entityRepository.save(res);
      });

      console.log(`Created ${entityChanges.created.length} ${key}`);
    }

    if (entityChanges.updated.length) {
      entityChanges.updated.forEach(async (entityData) => {
        const changedKeys = entityData._changed.split(",");
        const setEntity = pick(entityData, changedKeys);

        const entityToUpdate = await entityRepository.findOne(entityData.id);
        Object.assign(entityToUpdate, setEntity);
        await entityRepository.save(entityToUpdate);
      });

      console.log(`Updated ${entityChanges.updated.length} ${key}`);
    }
  });

  await handler(req.body);

  res.status(200).send();
}

module.exports = {
  push,
};
