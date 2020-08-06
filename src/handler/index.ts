import submitTask from './submitTask';

export default async function (changes) {
  return Promise.all([submitTask(changes)]);
}
