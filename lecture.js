// шаблон SINGLETON (одиночка або одинак чи самотній)
// список всіх замовлень
class RecentPurchases {
    static #instance = null; // створили статичну властивість

    // constructor() {
    //     this.purchases = [];
    // } // якщо ми використовуємо статичні методи томожемо відмовитися від конструктора
    static #purchases = [];

    static create() {
        if (!this.#instance) {
            this.#instance = new RecentPurchases();
        }
        return this.#instance;
    } // статичний метод для створення властивості, перевіряє чи не порожня і якщо ні то створює нову

    static add(item) { // статичний метод більш сучасний
        this.#purchases.push(item) // додати символ приватності до purchases якщо без конструктора
    } // метод для додавання нового замовлення в список

    static get() { // статичний метод більш сучасний
        return this.#purchases // додати символ приватності до purchases якщо без конструктора
    } // метод для витягування списку замовлень
}

RecentPurchases.create();
RecentPurchases.add("phone");
RecentPurchases.add("headphones");
console.log(RecentPurchases.get());

// const newPurchase = RecentPurchases.create();
// ===============
// const otherPurchase = RecentPurchases.create();
// console.log(newPurchase === otherPurchase);

// додаємо позиції до списку замовлень
// newPurchase.add("Phone");
// newPurchase.add("phone case");
// console.log(otherPurchase.get()); //дивимось чи додалося виводячи в консоль
// вивели інший список але все рівно все збереглося бо списки рівні (тобто працюють через посилання)



// шаблон Factory (фабрика)
class Button {          // це клас котрий створює кнопку з параметрами текст та колір
    constructor({ text, color}) {
        this.text = text;
        this.color = color;
    }
    render() {
        return `<button class="color:${this.color};">${this.text}</button>  `
    }
}
class IconButton {          // це клас котрий створює кнопку з параметрами іконка та колір
    constructor({ icon, color }) {
        this.icon = icon;
        this.color = color;
    }
    render() {
        return `<button class="color:${this.color};"><img src="${this.icon}"/></button>  `
    }
}

class ButtonFactory {           // це саме фабрика для класів Button & IconButton котрий по прийнятим параметрам створює кнопку відповідного типу 
    static TYPE = {
        BASIC: "basic",
        ICON: "icon",
    };
    static CreateButton(type, options) {
        switch (type) {
            case this.TYPE.BASIC:
                return new Button(options);
            case this.TYPE.ICON:
                return new IconButton(options);
            default:
                throw new Error(`Такого типу кнопки не існує`)
        }
    }
}
const myIconButton = ButtonFactory.CreateButton(ButtonFactory.TYPE.ICON, {
    color: "red",
    icon: "./icon/my-icon.svg"
})      // створення кнопки IconButton і в якості аргумента type ми передаємо ButtonFactory.TYPE.ICON тому що поле TYPE статичне
console.log(myIconButton);


// шаблон Observer (спостерігач)
// маємо клас користувачів User, клас Video, клас Channel
// клас Channel дозволяє створити відео, користувачу підписатися на канал, та у разі виходу нового відео відправити всім підписникам повідомлення про вихід нового відео
class User {
    constructor(email) {
        this.email = email;
    }
    sendEmail(message) {
        console.log(`Відправки на email ${this.email} повідомлення: ${message}`)
    }
}
class Video {
    constructor(name) {
        this.name = name;
    }
}

class Channel {
    constructor(name) {
        this.name = name;
        this.subscribers = [];
    }
    subscribe(user) {
        this.subscribers.push(user)
    } // підписка на канал
    unsubscribe(user) {
        this.subscribers = this.subscribers.filter((sub) => sub !== user)
    } // відписка від каналу; побудована на методі фільтрації масива
    createVideo(name) {
        const video = new Video(name);
        this.sendNotify(video);
    } // створення нового відео
    sendNotify(video) {
        this.subscribers.forEach((subscriber) => {
            subscriber.sendEmail(
                `Нове відео ${video.name} на нашому каналі ${this.name}`
            );
        })
    } //відправка повідомлення підписникам про нове відео
}

const channel = new Channel("IT brains");

const user1 = new User("john@example.com");
channel.subscribe(user1);
const user2 = new User("rony@example.com");
channel.subscribe(user2);
const user3 = new User("alex@example.com");
channel.subscribe(user3);

channel.createVideo("Lesson by HTML");
console.log("=== === === === === === === === ===");
channel.unsubscribe(user2);
channel.createVideo("Lesson by CSS");


// шаблон Decorator (Декоратор)
// в цьому прикладі ми створюємо функціонал для автомату котрі готує різні напої
// може додавати властивості до інших об'єктів але не змінюючи самі об'єкти
class Coffee {
    name = "Kava";
    cost = 25;
    cook() {
        console.log(`${this.name} is cooking`);
        // тут буде логіка приготування напою
    }   // приготування напою
}   // клас для приготування кави 
class MilkDecorator {
    constructor(coffee, amount) {
        this.coffee = coffee;
        this.amount = amount;
    }
    get name() {
        return `${this.coffee.name} with ${this.amount}ml of milk`
    }   // кава з деякою кількістю молока
    get cost() {
        const milkPrice = 0.05;
        return this.coffee.cost + this.amount * milkPrice;
    }   // розрахунок вартості кави з молоком
    cook() {
        console.log(`${this.name} is cooking`);
        // тут буде логіка приготування напою
    }   // приготування напою
}   // клас для приготування кави з молоком

let coffee = new Coffee();  // створення кави, базовий об'єкт
// console.log(coffee.name);
// console.log(coffee.cost);
// coffee.cook();
// console.log("=== === === === === === ===");
let latteCoffee = new MilkDecorator(coffee, 300);    // додавання декоратора до кави
// console.log(latteCoffee.name);
// console.log(latteCoffee.cost);
// latteCoffee.cook();


// шаблон Memento (Мементо) - 
class TextEditor {
    #text = '';
    
    set text(text) {
        this.#text = text;
        this.save();
    }   // сетер для приватого поля text
    get text() {
        return this.#text;
    }   // гетер для приватого поля text

    save() {
        Snapshot.create(this.text);
    }   // збереження 
    restore() {
        this.#text = Snapshot.restore().text;
    }   // відновлення
}

class Snapshot {
    constructor(text) {
        this.text = text;
    }
    static #snapshots = [];
    static create(text) {
        console.log(text);
        this.#snapshots.push(new Snapshot(text));
    }   // зберігаємо текст у масив 
    static restore() {
        this.#snapshots.pop();
        return this.#snapshots[this.#snapshots.length - 1];
    }   // дістаємо текст з масиву (останій елемент)
}       // цей клас зберігає текст і при необхідності повертає той що був до збереження

// const editor = new TextEditor();
// editor.text = "start text";
// editor.text = 'next text';
// editor.text = "after next text";

// console.log("=== === === === === === ===");
// console.log(editor.text);
// console.log("=== === === === === === ===");
// editor.restore();
// console.log(editor.text);
// editor.restore();
// console.log(editor.text);


// шаблон Chain of Responsibility або ланцюжок відповідальності
// суть цього патерну для розподілу запитів послідовно 
class AuthHandler {
    setNextHandler(handler) {
        this.nextHandler = handler;
        return handler;
    }
    login(user, password) {
        if (this.nextHandler) {
            return this.nextHandler.login(user, password)
        } else {
            return false
        }
    }
}       // цей клас відповідає за абстрактні методи котрі будуть далі надані іншим класам
class TwoFactorsAuthHandler extends AuthHandler {
    login(user, password) {
        if (
            user === "John" && password === "password" && this.isValidTwoFactorCode()
        ) {
            console.log("Вхід дозволено з двофакторною автентифікацією");
            return true
        } else {
            return super.login(user, password);
        }
    }
    isValidTwoFactorCode() {
        return true;
    }
}       // цей класс робить перевірку і у разі чого відправляє до батьківського класу для перевірки
class RoleHandler extends AuthHandler {
    login(user, password) {
        if (user === "quest") {
            console.log("Log in as quest");
            return true;
        } else {
            return super.login(user, password);
        }
    }
}
class CredentialsHandler extends AuthHandler {
    login(user, password) {
        if (user === "admin" && password === "admin123") {
            console.log("Access by login and password");
            return true;
        } else {
            return super.login(user, password);
        }
    }
}

const handler = new TwoFactorsAuthHandler();
// handler.setNextHandler({
//     login: (login, password) => {
//         const result = ((login === "login" && password === "password") ? "User log in account" : "User does not log in account");
//         console.log(result);
//         return result;
//         // console.log(arg)
//     },
// })

// поставимо інший обробщик в handler.setNextHandler та передамо інші дані в handler.login
// handler.setNextHandler(new CredentialsHandler());
// handler.login("admin", "admin123");

// створимо загальний клас HandleBuilder
class HandleBuiler {
    constructor() {
        this.firstHandler = null;
        this.lastHandler = null;
    }
    add(handler) {
        if (!this.firstHandler) {
            this.firstHandler = handler;
            this.lastHandler = handler;
        } else {
            this.lastHandler.setNextHandler(handler);
            this.lastHandler = handler;
        }
        return this
    }
    create() {
        return this.firstHandler;
    }
}

const handleBuilder = new HandleBuiler();
const handler3 = handleBuilder
    .add(new CredentialsHandler())
    .add(new TwoFactorsAuthHandler())
    .add(new RoleHandler())
    .create();
// handler3.login("admin", "admin123") // вхід буде дозволено за логіном та паролем
// handler3.login("quest", "quest123") // вхід буде дозволено за роллю гостя
// handler3.login("user", "password")  // вхід заборонено
// handler3.login("John", "password")  // вхід буде дозволено за двофакторною автентифікацією

const handler2 = new CredentialsHandler();
handler2.setNextHandler(new RoleHandler());
handler.setNextHandler(handler2);
// handler2.login("quest", "admin123")
// handler.login("login", "password");
// в цілому прикольна штука - треба розібратися більш детально з нею


// шаблон Bridge (міст)
class User2 {
    constructor(name, messanger) {
        this.name = name;
        this.messanger = messanger;
    }
    sendMessage(message) {
        const formattedMessage = this.formatMessage(message);
        this.messanger.sendMessage(formattedMessage)
        // return formattedMessage;
    }
    formatMessage(message) {
        return `[${this.name}]: ${message}`
    }
}   // цу в нас клас користувача який відправляє повідомлення
// але повідомлення можуть бути відправлені різними методами: СМС, телеграм, емейл, вайбер і тд
// метод відправки вказуються в змінній messanger
class SMSMessanger {
    static sendMessage(message) {
        console.log(`SMS was sent: ${message}`)
    }
}
class EmailMessanger {
    static sendMessage(message) {
        console.log(`e-mail was sent: ${message}`)
    }
}
// поєднуємо класи User & Messanger
const john = new User2("John", SMSMessanger);
const jane = new User2("Jane", EmailMessanger);

john.sendMessage("Hello");
jane.sendMessage("world");