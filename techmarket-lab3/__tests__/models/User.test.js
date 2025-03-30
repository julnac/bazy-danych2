const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../../models/User');

beforeAll(async () => {
    await sequelize.sync({ force: true }); 
  });
  
afterAll(async () => {
  await sequelize.close();
});
  
describe('User Model', () => {

    test('should create a user successfully', async () => {
    const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'hashedpassword123',
        first_name: 'John',
        last_name: 'Doe'
    });

    expect(user).toHaveProperty('id');
    expect(user.username).toBe('testuser');
    });

    test('should not allow duplicate username', async () => {
    await User.create({
        username: 'uniqueuser',
        email: 'unique@example.com',
        password_hash: 'hashedpassword123'
    });

    await expect(
        User.create({
        username: 'uniqueuser',
        email: 'another@example.com',
        password_hash: 'hashedpassword123'
        })
    ).rejects.toThrow();
    });

    test('should not allow invalid email', async () => {
    await expect(
        User.create({
        username: 'invalidemailuser',
        email: 'not-an-email',
        password_hash: 'hashedpassword123'
        })
    ).rejects.toThrow();
    });

    test('should require username and email', async () => {
    await expect(
        User.create({
        password_hash: 'hashedpassword123'
        })
    ).rejects.toThrow();
    });
});