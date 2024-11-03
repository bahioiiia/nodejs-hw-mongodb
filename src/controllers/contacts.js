import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
        const data = await contactServices.getContacts();

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

    if (!data) { throw createHttpError(404, `Movie with id=${id} not found`); }
    
    res.status(200).json({
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};