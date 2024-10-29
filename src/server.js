//setupServer
// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from "./utils/env.js";

import * as contactServices from './services/contacts.js';

export const setupServer = () => {
    const app = express();

    app.use(cors());
    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });
    // app.use(logger);

    app.get('/contacts', async (req, res) => {
    const data = await contactServices.getContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
    });

    app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    if (contactId.length!==24) {
        return res.status(404).json({
            status: 404,
            message: 'input must be a 24 character hex string',
        });
    }
    const data = await contactServices.getContactById(contactId);

    if (!data) {
        return res.status(404).json({
            status: 404,
            message: 'Contact not found',
        });
    }
    res.status(200).json({
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
    });    
	
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