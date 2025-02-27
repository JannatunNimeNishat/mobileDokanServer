import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import seedSuperAdmin from "./app/DB";


async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    seedSuperAdmin();

    app.listen(config.port, () => {
      console.log(`smartphone management app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
