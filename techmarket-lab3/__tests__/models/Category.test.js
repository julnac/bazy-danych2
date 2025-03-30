const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Category = require('../../models/Category');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Category Model', () => {
  
  it('powinien utworzyć kategorię z poprawnymi danymi', async () => {
    const categoryData = {
      name: 'Elektronika',
      description: 'Produkty elektroniczne i AGD'
    };
    let category;
    try{
      category = await Category.create(categoryData);
    }
    catch (error){
      console.log(error)
    }

    expect(category.id).toBeDefined();
    expect(category.name).toBe(categoryData.name);
    expect(category.description).toBe(categoryData.description);
  });

  it('powinien zwrócić błąd, gdy nazwa jest pusta', async () => {
    const categoryData = {
      name: '',
      description: 'Opis kategorii'
    };

    await expect(Category.create(categoryData)).rejects.toThrow('Name cannot be empty');
  });

  it('powinien zwrócić błąd, gdy nazwa ma mniej niż 3 znaki', async () => {
    const categoryData = {
      name: 'AB', // Za krótka nazwa
      description: 'Opis testowy'
    };

    await expect(Category.create(categoryData)).rejects.toThrow('Name must be between 3 and 100 characters');
  });

  it('powinien pozwolić na utworzenie kategorii bez opisu', async () => {
    const categoryData = {
      name: 'Sport'
    };

    const category = await Category.create(categoryData);

    expect(category.id).toBeDefined();
    expect(category.name).toBe(categoryData.name);
    expect(category.description).toBeNull(); // Opis może być null
  });

  it('powinien obsłużyć duży opis', async () => {
    const longDescription = 'A'.repeat(500);
    const categoryData = {
      name: 'Książki',
      description: longDescription
    };

    const category = await Category.create(categoryData);

    expect(category.id).toBeDefined();
    expect(category.description).toBe(longDescription);
  });
});
