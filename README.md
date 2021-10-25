# Шаблон для выполнения домашнего задания по Webpack

ШРИ осень 2021

## Что делать?


### Разминка

Текущий репозиторий содержит web приложение со сломанной сборкой. Вам предстоит поэтапно обновлять `webpack.config.ts`,
добавляя необходимые секции. После этого, необходимо пройти валидации сборки, не изменяя исходный код приложения.
По итогу, команда `npm run build` должна проходить без ошибок

### Задание

Очень часто проекты и кодовая база в них растут очень быстро. В связи с этим, появляется проблема наличия мертвых файлов, которые только путают новых разработчиков и замедляют индексацию IDE. Понять, какие файлы действительно попадают к пользователю, можно переиспользовав данные о сборке.

Вам нужно добавить в свою сборку:
- шаг сбора информации о попавших в сборку модулях (обращаемся к информации о компиляции)
- шаг сбора информации о всех модулях на файловой системе (самописный обход директорий через модуль fs)

В результате, в корне вашего проекта должен появиться файл `unused` , содержащий массив с абсолютными путями до неиспользуемых модулей.

Например:
```json
[
  "/Users/nickshevr/Documents/Yandex/shri-2021-typescript/user/repo/sample/rhuhp.css",
  "/Users/nickshevr/Documents/Yandex/shri-2021-typescript/user/repo/sample/u5gvv.js"
]
```

Полезные ссылки:
https://webpack.js.org/contribute/writing-a-plugin/
https://webpack.js.org/api/compiler-hooks

О чем нужно подумать:
- использование асинхронного/синхронного `fs`
- кастомизация и переиспользование плагина другими людьми
- модулей может быть много (10^3), нужно выбрать правильный алгоритм, лимит на сборку 10с
- плагин - это класс, не стоит всю логику описывать в одном методе