import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { Chance } from 'chance';

type Pet = {
  name: string
  id: number,
  status: string,
  category?: {
    id: string
    name: number
  }[],
  tags?: {
    id: string
    name: number
  }[]
};

export class PetStore {
  readonly request: APIRequestContext;
  readonly chance: Chance;
  
  constructor(request: APIRequestContext) {
    this.request = request;
    this.chance = new Chance();
  }

  addPet = async (status: string): Promise<Pet> => {
    const url = '/v2/pet';
    return await test.step(`[POST] call request ${url}`, async () => {
      const pet = {
        name: this.chance.word(),
        id: this.chance.natural(),
        status
      };
      
      const response = await this.request.post(url, { data: pet });
      await expect(response, `request to ${url} did not have status OK!`).toBeOK();    
      return await response.json();
    });
  }

  getPetById = async (petId: number): Promise<Pet> => {
    const url = `/v2/pet/${petId}`;
    return await test.step(`[GET] call request ${url}`, async () => {
      const response = await this.request.get(url);
      await expect(response, `request to ${url} did not have status OK!`).toBeOK();    
      return await response.json();
    });
  }

  findPetByStatus = async (status: string): Promise<Pet[]> => {
    const url = `/v2/pet/findByStatus?status=${status}`;
    return await test.step(`[GET] call request ${url}`, async () => {
      const response = await this.request.get(url);
      await expect(response, `request to ${url} did not have status OK!`).toBeOK();    
      return await response.json();
    });
  }

  validatePetCreated = async (expectedPet: Pet): Promise<void> => {
    await test.step(`validate pet with id "${expectedPet.id}" was created sucessfully`, async () => {
      const pet = await this.getPetById(expectedPet.id);
      await expect(pet, `actual pet did not match expected object!`).toMatchObject(expectedPet);
    });
  }  

  validatePetStatus = async (pet: Pet, expectedStatus: string): Promise<void> => {
    await test.step(`validate pet with id "${pet.id}" has the status "${expectedStatus}"`, async () => {
      await expect(pet.status, `pet "${pet.name}" with id "${pet.id}" does not have status: "${expectedStatus}"!`).toBe(expectedStatus);
    });
  }  

  validatePetName = async (pet: Pet, expectedName: string): Promise<void> => {
    await test.step(`validate pet with id "${pet.id}" has the name "${expectedName}"`, async () => {
      const actual = await this.getPetById(pet.id);
      expect(actual.name, `pet with id "${pet.id}" does not have name: "${expectedName}"!`).toBe(expectedName);
    });
  }  
}
