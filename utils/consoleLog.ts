import { inspect } from "util";

export const consoleLog = (value: unknown) => {
  console.log(inspect(value, { showHidden: false, depth: null, colors: true }));
  console.log(`####################################################################################################`);
};
