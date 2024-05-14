import app from "./app";

const PORT: number = Number(process.env.PORT);

app.listen(PORT, (): void => console.log(`App is running on port: ${PORT}.`));
