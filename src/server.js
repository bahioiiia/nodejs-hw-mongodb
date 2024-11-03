//setupServer
// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from "./utils/env.js";

import contactsRouter from "./routers/contacts.js"

export const setupServer = () => {
    const app = express();

    app.use(cors());
    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });
    // app.use(logger);

    app.use('/contacts', contactsRouter);
	
    app.use((req, res) => {
    res.status(404).json({
        message: 'Not found',
    });
    });

    app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
    });
    });

	const port = Number(env("PORT", 3000));
	app.listen(port, () => console.log(`Server is running on ${port}`));
};