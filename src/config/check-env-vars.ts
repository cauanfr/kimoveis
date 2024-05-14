import fs from "node:fs";
import path from "node:path";
import { AnyZodObject, z } from "zod";

function loadExampleVariables(): string[] {
  const envVariables: string[] = [];

  try {
    const envPath = path.join(__dirname, "../../.env.example");
    const data = fs.readFileSync(envPath, "utf-8");

    data.split("\n").forEach((val) => {
      if (val.length > 1 && !val.startsWith("#")) {
        envVariables.push(val.split("=")[0]);
      }
    });
  } catch (error) {
    console.error(error);
  }

  return envVariables;
}

function createDynamicEnvSchema(fields: string[]): AnyZodObject {
  return z.object(Object.fromEntries(fields.map((f) => [f, z.string()])));
}

export function checkEnvVariables(): void {
  const vars = loadExampleVariables();
  const result = createDynamicEnvSchema(vars).safeParse(process.env);

  if (!result.success) {
    result.error.issues.forEach(({ path }) => {
      console.error(`Missing environment variable '${path}'`);
    });

    process.exit(1);
  }
}
