import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) => response.json({ status: "ok" }));

export default routes;
