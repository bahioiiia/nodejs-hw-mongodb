import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getContactsController = async (req, res, next) => {
    console.log(req.query);
    const { page, perPage } = parsePaginationParams(req.query);
    console.log("contr", page, perPage);
    const data = await contactServices.getContacts({ page, perPage });
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
};
    
export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    if (contactId.length !== 24) { throw createHttpError(404, 'Contact ID must be a 24 character hex string'); }
    
    const data = await contactServices.getContactById(contactId);
    if (!data) { throw createHttpError(404, `Contact with id=${id} not found`); }
    
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};

export const addContactsController = async (req, res, next) => {
    const data = await contactServices.addContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data,
    });
};

export const upsertContactController = async (req, res) => {
    const { contactId: _id } = req.params;
    const result = await contactServices.updateContact({ _id, payload: req.body, options: { upsert: true } });
    const status = result.isNew ? 201 : 200;
    
    res.status(status).json({
        status,
        message: 'Contact upserted successfully',
        data: result.data,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId: _id } = req.params;
    const result = await contactServices.updateContact({_id, payload: req.body});

    if (!result) { throw createHttpError(404, 'Contact not found'); }
    res.status(200).json({
        status: 200,
        message: 'Contact patched successfully',
        data: result.data,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId: _id } = req.params;
    const data = await contactServices.deleteContact({ _id });
    if (!data) { throw createHttpError(404, 'Contact not found'); }

    res.status(204).send();
};