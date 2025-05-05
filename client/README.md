# 🚀 Client (frontend)

## 📝 Описание

Frontend часть приложения на React (Vite), предоставляющая пользовательский интерфейс для загрузки и преобразования исходного изображения в ASCII-арт.

## 🔧 Технологии

- **Язык**: [Typescript](https://www.typescriptlang.org/)
- **Фреймворк**: [React](https://react.dev/)
- **Сборщик проекта**: [Vite](https://vite.dev/)
- **Форматирование**: [Prettier](https://prettier.io/) / [ESlint](https://eslint.org/)
- **HTTP запросы**: [TanStack React Query](https://tanstack.com/query/latest)
- **Стейт менеджер** [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- **UI**: [Tailwind CSS](https://tailwindcss.com/) / [Flowbite-React](https://flowbite-react.com/) / [TanStack React Table](https://tanstack.com/table/latest) / [Lucide-React](https://lucide.dev/) / [React-Dropzone](https://react-dropzone.js.org/#src) / [React-Hook-Form](https://react-hook-form.com/)

## 📁 Структура проекта

```
client/
├── public/          # Изображения для UI
├── src/             # Исходный код
└───└── store/       # Zustand стейты
└───└── converters/  # Конвертер изображения в ASCII-арт
└───└── components/  # UI компоненты
```

## 📐 Алгоритм преобразования

1. При загрузке изображения создаётся временный HTML тег **canvas** (не размещается в DOM), с помощью которого исходное изображение сживается до значения желаемого размера ASCII-арта.
2. Для каждого пикселя сжатого изображения рассчитывается его яркость по шкале серости с нормализацией по формуле ниже:

```Typescript
// grayscale color: 0 - 1 (dark - bright)
let brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
```

3. Далее для каждого используемого знака для ASCII-арта рассчитывается диапазон яркости
4. В конце алгоритма получается строка, где каждый символ по яркости соответствует расчитанной яркости конкретного пикселя сжатого исходного изображения

Таким образом получаем чёрно-белый ASCII-арт, однако если использовать ASNI символы, то можно сделать цветной ASCII-арт

## Примечание

В проекте можно поиграться с [настройками](./src/converters/imageToAsciiConverter.ts) преобразования изображения в ASCII-арт (UI для этого пока нет):

```Typescript
const DEFAULT_OPTIONS: AsciiOptions = {
  width: 150, // половинная ширина ASCII-арта (каждый символ печатается дважды для соблюдения пропорций). Чем больше половинная ширина, тем детальнее получается ASCII-арт
  chars: "¶@ØÆMåBNÊßÔR#8Q&mÃ0À$GXZA5ñk2S%±3Fz¢yÝCJf1t7ªLc¿+?(r/¤²!*;\"^:,'.` ", // набор используемых символов для ASCII-арта
  contrast: 1.0, // контрастность ASCII-арта (если слишком "жирное" изображение, можно уменьшить контрастность)
};
```
