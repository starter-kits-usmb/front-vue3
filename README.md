# vue-starter-kit

This template should help get you started developing with Vue 3 in Vite. It includes the following features:

- [x] Scalable folder structure
- [x] Linter and prettier
- [x] Routing and lazy loading
- [ ] Authentication store
- [x] Light design system and layout utilities (css class based)
- [x] Toast store (snackbar and loading screen)
- [ ] Modal store (support custom modals)
- [x] Test setup

## Start from this template

1. Clone this repository
2. Delete `.git` folder and run `git init` to start a new repository
3. Run `npm install`
4. Run `npn run dev` to start the development server
5. Navigate to `http://localhost:5173/`.

### Build

```sh
npm run build
```

## linter and prettier

Setup your ide to lint and format on save. This will help you to keep the code clean and consistent.

for vscode, install the following extensions:

- prettier
- eslint

and configure them to lint on save.

## Routing and lazy loading

Use lazy loading in the router.

```typescript
{
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
},
```

## Authentication service

TODO

## Design system

This is a very light design system, based on css classes. The idea is to have a set of classes that can be used to build the UI.

### Flex layout

The syntax is `.flex-<direction>`.
The direction can be `row` or `col` and it can be combined with the following modifiers:
`.left`, `.center`, `.right` for the x-axis
`.top`, `.middle`, `.bottom` for the y-axis
`.btw` for space between elements following the direction
`.wrap`, `.wrap-reverse` for wrapping elements
for wrapping elements in reverse order
`.no-gap`, `.small-gap`, `.micro-gap` for the gap between elements. By default, the gap is 1rem.

### Grid layout

The syntax is `.grid-<row/col>-<number>`.
The number can be from 2 to 5 and symbolize the number of columns/rows.

### Sizes

The syntax is `.h-<size>` for height and `.w-<size>` for width.
`full` size is 100vw or 100vh
`100` and `50` are % values.

### Variables

The variables are defined in `src/styles/variables.scss` file. You can use them in your components it's automatically imported. Use them as much as possible to keep the design consistent.

### Responsive

For responsive design, use flex layout and grid layout as much as possible and avoid `px` values. Use `vw`/`vh` `rem` and `%` values instead.

You can also use the following mixins:

```scss
.my-class {
  //default styles (in this case for width 300px to 600px)

  @include width-under(300px) {
    // styles for width under 300px
  }

  @include width-over(600px) {
    // styles for width over 600px
  }
}
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
