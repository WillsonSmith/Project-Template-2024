import { run } from './main/run';

const args = process.argv;
run(args).catch((err) => console.error(err));
