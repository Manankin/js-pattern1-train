// Фабрика (Factory) — це патерн програмування, який надає загальний клас для створення об'єктів, який враховуєпередані аргументи та вирішує який клас повинен мати об’єкт при створенні
// Клас Book описує книгу в магазині
class Book {
  // Конструктор Book приймає об'єкт з параметрами (title, author, coverColor) - це назва книги, автор книги, колір обкладинки книги
  constructor({ title, author, coverColor }) {
    this.title = title;
    this.author = author;
    this.coverColor = coverColor;
  }
  // Метод describe генерує опис книги та повертає рядок у форматі: "Книга: '{назва}', автор: '{автор}', колір обкладинки: '{колір}'"
  describe() {
    return `Книга: '${this.title}', автор: '${this.author}', колір обкладинки: '${this.coverColor}'`
  } 
}

// Клас AudioBook описує аудіокнигу в магазині
class AudioBook {
  // Конструктор AudioBook приймає об'єкт з параметрами: title, author, audioLength
  constructor({ title, author, audioLength }) {
    // Метод describe генерує опис аудіокниги та повертає рядок у форматі: "Аудіокнига: '{назва}', автор: '{автор}', тривалість: '{тривалість}'"
    this.title = title;
    this.author = author;
    this.audioLength = audioLength;
  }
  // Метод describe генерує опис аудіокниги та повертає рядок у форматі: "Аудіокнига: '{назва}', автор: '{автор}', тривалість: '{тривалість}'"
  describe() {
    return `Аудіокнига: '${this.title}', автор: '${this.author}', тривалість: '${this.audioLength}'`
  }
}

// Клас ProductFactory використовується для створення об'єктів-продуктів.
class ProductFactory {
  // TYPE - статична властивість, що визначає типи продуктів, які можуть бути створені.
  static TYPE = {
    BOOK: "book",
    AUDIOBOOK: "audiobook",
  }
  // Статичний метод createProduct використовується для створення об'єктів-продуктів, отримує type - тип продукту, що має бути створений. Має бути одним зі значень властивості TYPE та options - об'єкт з параметрами для конструктора продукту.
  static createProduct(type, options) {
  switch (type) {
  //В залежності від типу, повертає або екземпляр класу Book, або AudioBook.
    case this.TYPE.BOOK:
      return new Book(options);
    case this.TYPE.AUDIOBOOK:
      return new AudioBook(options);
    default:
    // Кидає помилку, якщо переданий тип не підтримується `Такого типу продукту не існує: ${type}`.
      throw new Error(`Такого типу продукту не існує: ${type}`)
    }
  }
}
console.log("Завдання 2 ====================================");
// Після виконання розкоментуйте код нижче
// Використовуємо ProductFactory для створення нової книги
const factoryBook = ProductFactory.createProduct(ProductFactory.TYPE.BOOK, {
  title: "Назва книги",
  author: "Автор книги",
  coverColor: "Синій",
});
// Виводимо в консоль опис нової книги
console.log(factoryBook.describe());

// Використовуємо ProductFactory для створення нової аудіокниги
const factoryAudiobook = ProductFactory.createProduct(
  ProductFactory.TYPE.AUDIOBOOK,
  {
    title: "Назва аудіокниги",
    author: "Автор аудіокниги ",
    audioLength: "5 годин",
  }
);
// Виводимо в консоль опис нової аудіокниги
console.log(factoryAudiobook.describe());

// Спробуємо створити продукт непідтримуваного типу
try {
  const factoryUnknown = ProductFactory.createProduct("comics", {});
} catch (error) {
  // Виводимо помилку в консоль
  console.error(error.message);
}
