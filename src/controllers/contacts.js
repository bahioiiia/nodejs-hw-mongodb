import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';


export const getContactsController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    //console.log("contr", page, perPage, sortBy, sortOrder);

    const filter = parseFilterParams(req.query);
    const { _id: userId } = req.user;
    filter.userId = userId;

    const data = await contactServices.getContacts({ page, perPage, sortBy, sortOrder, filter });
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
};
    
export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    if (contactId.length !== 24) { throw createHttpError(404, 'Contact ID must be a 24 character hex string'); }
    
    const data = await contactServices.getContactById(contactId, userId);
    if (!data) { throw createHttpError(404, `Contact with id=${id} not found`); }
    
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};

export const addContactsController = async (req, res, next) => {
    const {_id: userId} = req.user;
    const data = await contactServices.addContact({ ...req.body, userId });
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data,
    });
};

export const upsertContactController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId} = req.user;
    const result = await contactServices.updateContact({ contactId, userId, payload: req.body, options: { upsert: true } });
    const status = result.isNew ? 201 : 200;
    
    res.status(status).json({
        status,
        message: 'Contact upserted successfully',
        data: result.data,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const result = await contactServices.updateContact({ contactId, userId, payload: req.body});

    if (!result) { throw createHttpError(404, 'Contact not found'); }
    res.status(200).json({
        status: 200,
        message: 'Contact patched successfully',
        data: result.data,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const data = await contactServices.deleteContact({ contactId, userId });
    if (!data) { throw createHttpError(404, 'Contact not found'); }

    res.status(204).send();
};