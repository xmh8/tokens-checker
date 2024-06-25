import chalk from "chalk";
import { appendFileSync } from "fs";
import moment from "moment";
import getUser from "./functions/getUser";
import loadTokens from "./functions/loadTokens";
import { User } from "./interfaces/user";

async function run() {
  process.title = "Tokens Checker | 0 Tokens | https://github.com/xmh8";

  let tokens = loadTokens();

  if (!tokens.length) {
    console.log(chalk.red.bold(`${date()} No tokens found in file (input/tokens.txt)`));
    console.log();
    console.log(`${chalk.red.bold("•")} ${chalk.blue.bold("PRESS ANY KEY TO EXIT ...")}`);

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", () => process.exit());

    return;
  }

  console.log(`${date()} ${chalk.red.bold(`Checking ${chalk.blue(`${tokens.length}`)} tokens..`)}`);
  console.log();

  let stats = {
    valid: 0,
    invalid: 0,
    nitro: 0,
    verified: 0,
    phone: 0,
  };

  process.title = `Tokens Checker | ${tokens.length} Tokens | ${stats.valid} Valid - ${stats.invalid} Invalid - ${stats.nitro} Nitro - ${stats.verified} Verfied - ${stats.phone} Phone | https://github.com/xmh8`;

  let startTimestamp = Date.now();

  for (let i = 0; i < tokens.length; i++) {
    let user: User = await getUser(tokens[i]);

    if (user?.id) {
      try {
        appendFileSync("output/valid.txt", tokens[i] + "\n");
      } catch {}

      stats.valid++;

      if (user.premium_type == 2) stats.nitro++;
      if (user.verified) stats.verified++;
      if (user.phone) stats.phone++;

      console.log(
        `${date()} ${chalk.green.bold("Valid")} >>> [${chalk.white.bold(tokens[i].split(".")[0])}..], ${chalk.white.bold(
          `${user.global_name} | Phone: ${user.phone ? chalk.green.bold("true") : chalk.red.bold("false")} | Verified: ${
            user.verified ? chalk.green.bold("true") : chalk.red.bold("false")
          } | Nitro: ${user.premium_type == 2 ? chalk.green.bold("true") : chalk.red.bold("false")}`
        )}`
      );

      process.title = `Tokens Checker | ${tokens.length} Tokens | ${stats.valid} Valid - ${stats.invalid} Invalid - ${stats.nitro} Nitro - ${stats.verified} Verfied - ${stats.phone} Phone | https://github.com/xmh8`;
    } else {
      try {
        appendFileSync("output/invalid.txt", tokens[i] + "\n");
      } catch {}

      stats.invalid++;

      console.log(`${date()} ${chalk.red.bold("Invalid")} >>> [${chalk.red.bold(tokens[i])}]`);
      process.title = `Tokens Checker | ${tokens.length} Tokens | ${stats.valid} Valid - ${stats.invalid} Invalid - ${stats.nitro} Nitro - ${stats.verified} Verfied - ${stats.phone} Phone | https://github.com/xmh8`;
    }
  }

  console.log();

  let duration = Date.now() - startTimestamp;

  let minutes = Math.floor(duration / 60000);
  let seconds = Math.floor((duration % 60000) / 1000);
  let ms = (duration % 60000) % 1000;

  console.log(
    `${date()} Finished in ${chalk.blue(minutes.toString())} minutes, ${chalk.blue(seconds.toString())} seconds, ${chalk.blue(ms.toString())} ms`
  );
  console.log(
    `${chalk.yellow.bold("•")} Valid: ${chalk.blue.bold(stats.valid.toString())} | ${chalk.yellow.bold("•")} Invalid: ${chalk.blue.bold(
      (tokens.length - stats.valid).toString()
    )}`
  );
  console.log(
    `${chalk.yellow.bold("•")} Verified: ${chalk.blue.bold(stats.verified.toString())} | ${chalk.yellow.bold("•")} Unverified: ${chalk.blue.bold(
      (stats.valid - stats.verified).toString()
    )}`
  );
  console.log(
    `${chalk.yellow.bold("•")} Has Nitro: ${chalk.blue.bold(stats.nitro.toString())} | ${chalk.yellow.bold("•")} Hasn't Nitro: ${chalk.blue.bold(
      (stats.valid - stats.nitro).toString()
    )}`
  );
  console.log(
    `${chalk.yellow.bold("•")} Phone Verified: ${chalk.blue.bold(stats.phone.toString())} | ${chalk.yellow.bold(
      "•"
    )} Phone Unverified: ${chalk.blue.bold((stats.valid - stats.phone).toString())}`
  );

  console.log();

  console.log(`${chalk.red.bold("•")} ${chalk.blue.bold("PRESS ANY KEY TO EXIT ...")}`);

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", () => process.exit());
}

function date() {
  return chalk.grey.bold(`[${moment(new Date()).format("hh:mm:ss")}]`);
}

run();
