import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({  page = 1,  perPage = 10,   sortBy = '_id', sortOrder = 'asc', filter={},}) => {
    const skip = (page - 1) * perPage;
    const query = ContactCollection.find();
    if (filter.isFavourite) {
        query.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.userId) {
        query.where('userId').equals(filter.userId);
    }
    
    const totalItems = await ContactCollection.find().merge(query).countDocuments();
    const data = await query.find().skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    const paginationData = calculatePaginationData({ totalItems, page, perPage, });
    
    //console.log(paginationData);
    return { data, ...paginationData };
};

export const getContactById = (_id, userId) => ContactCollection.findOne({ _id, userId });

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (contactId, userId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        { ...options, new: true, includeResultMetadata: true, });
    //console.log("UPD serv",rawResult);
    if (!rawResult || !rawResult.value) return null;
    return {
        data: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted),
    };
};

export const deleteContact = async (contactId, userId) => await ContactCollection.findOneAndDelete({ _id: contactId, userId });