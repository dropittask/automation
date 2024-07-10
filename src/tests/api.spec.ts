import { test } from '../custom_test';

test.describe.parallel('api testing', async () => {
  test('create a pet with status "available"', async ({ petStore }) => {
    const pet = await petStore.addPet('available');
    await petStore.validatePetCreated(pet);
    await petStore.validatePetStatus(pet, 'available');
  });

  // fails due to the 4th pet name is not "Puff"
  test.fail('Find pet by status "available" and verify the 4th pet name is "Puff"', async ({ petStore }) => {
    const searchResults = await petStore.findPetByStatus('available');
    console.log(searchResults[3]);
    await petStore.validatePetName(searchResults[3], 'Puff');
  });

  test('when query contains "status=sold" all search results should have status "sold"', async ({ petStore }) => {
    const searchResults = await petStore.findPetByStatus('sold');

    for await(let pet of searchResults) {
      await petStore.validatePetStatus(pet, 'sold');
    };
  });
});
