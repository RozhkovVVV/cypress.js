import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки востановить пароль
          });

    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик и он виден пользователю
         });
    
    it('Верный пароль и верный логин', function () {
         cy.get('#mail').type(data.login);  // Ввели верный логин
         cy.get('#pass').type(data.password);  //Ввели правильный пароль
         cy.get('#loginButton').click();  //Нажал войти

         cy.wait (5000);

         cy.get('#messageHeader').contains('Авторизация прошла успешно');  //Проверяю, что после авторизации есть текст
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
     })
 
     it('Верный логин и неверный пароль', function () {
        cy.get('#mail').type(data.login);  // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio178');   //Ввели неправильный пароль
        cy.get('#loginButton').click();   //Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');   //Проверяю, что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
     })

    it('Неверный логин и верный пароль', function () {
        cy.get('#mail').type('negerman@dolnikov.ru');  // Ввели неверный логин
        cy.get('#pass').type(data.password);   //Ввели правильный пароль
        cy.get('#loginButton').click();   //Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');   //Проверяю, что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
     })

    it('Верный пароль и верный логин со Строчными буквами', function () {
        cy.get('#mail').type('GerMaN@DolnikoV.ru');  // Ввели верный логин со строчными буквами
        cy.get('#pass').type(data.password);  //Ввели правильный пароль
        cy.get('#loginButton').click();  //Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');  //Проверяю, что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
     })

    it('Валидация на наличие @', function () {
        cy.get('#mail').type('germandolnikov.ru'); // Ввели верный логин без собаки
        cy.get('#pass').type(data.password);  //Ввели правильный пароль
        cy.get('#loginButton').click();   //Нажал войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');   //Проверяю, что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
    })

    it('Восстановление пароля', function () {
        cy.get('#forgotEmailButton').click();  // Нажать восстановит пароль
        cy.get('#mailForgot').type(data.login);  // Ввести почту для восстановления
        cy.get('#restoreEmailButton').click(); // Нажать кнопку отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //Проверяю, что после отправки кода есть текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
    })

 })