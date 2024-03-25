import { db } from './conn';

/**
 * * Array of all collections in DB
 */
const arrayCollections = [
  'user_addresses',
  'tickets',
  'transactions',
  'events',
  'event_addresses',
  'type_of_payments',
  'credit_cards',
  'bank_transfers',
];

/**
 * * Function to create all collections in DB by model in Moon modeler
 */
const createCollections = async () => {
  for (const collectionName of arrayCollections) {
    try {
      await db.createCollection(collectionName);
      console.log(`Collection "${collectionName}" was created.`);
    } catch (error) {
      console.error(`Error when creating a collection "${collectionName}": ${error}`);
    }
  }

  console.log('All collections were successfully created.');
};

export { createCollections };
