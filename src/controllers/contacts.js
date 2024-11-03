import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
    try {
        const data = await contactServices.getContacts();

        res.json({
            status: 200,
            message: 'Successfully found contacts!',
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
    };
        
export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    if (contactId.length!==24) {
        return res.status(404).json({
            status: 404,
            message: 'Contact ID must be a 24 character hex string',
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
};