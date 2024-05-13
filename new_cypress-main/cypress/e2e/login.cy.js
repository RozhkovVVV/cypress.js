describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/');  //Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки востановить пароль

         cy.get('#mail').type('german@dolnikov.ru');  // Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1');  //Ввели правильный пароль
         cy.get('#loginButton').click();  //Нажал войти

         cy.wait (5000);

         cy.get('#messageHeader').contains('Авторизация прошла успешно');  //Проверяю, что после авторизации есть текст
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден пользователю
       
     })
 
     it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверить цвет кнопки востановить пароль

        cy.get('#mail').type('german@dolnikov.ru');  // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio178');   //Ввели неправильный пароль
        cy.get('#loginButton').click();   //Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');   //Проверяю, что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик и он виден пользователю
    })

    it('Неверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверить цвет кнопки востановить пароль

        cy.get('#mail').type('negerman@dolnikov.ru');  // Ввели неверный логин
        cy.get('#pass').type('iLoveqastudio1');   //Ввели правильный пароль
        cy.get('#loginButton').click();   //Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');   //Проверяю, что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик и он виден пользователю
    })

    it('Верный пароль и верный логин со Строчными буквами', function () {
        cy.visit('https://login.qa.studio/');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки востановить пароль

        cy.get('#mail').type('GerMaN@DolnikoV.ru');  // Ввели верный логин со строчными буквами
        cy.get('#pass').type('iLoveqastudio1');  //Ввели правильный пароль
        cy.get('#loginButton').click();  //Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');  //Проверяю, что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден пользователю
    })

    it('Валидация на наличие @', function () {
        cy.visit('https://login.qa.studio');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверить цвет кнопки востановить пароль

        cy.get('#mail').type('germandolnikov.ru'); // Ввели верный логин без собаки
        cy.get('#pass').type('iLoveqastudio1');  //Ввели правильный пароль
        cy.get('#loginButton').click();   //Нажал войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');   //Проверяю, что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден пользователю
    })

    it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверить цвет кнопки востановить пароль

        cy.get('#forgotEmailButton').click();  // Нажать восстановит пароль
        cy.get('#mailForgot').type('german@dolnikov.ru');  // Ввести почту для восстановления
        cy.get('#restoreEmailButton').click(); // Нажать кнопку отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //Проверяю, что после отправки кода есть текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик и он виден пользователю
    })


 })