![Deploy to Production](https://github.com/vtimbuc/vtimbuc/workflows/Deploy%20to%20Production/badge.svg)

## Quick start

- `yarn global add gulp` _(Skip if you already have gulp installed)_

- `yarn install` _(Install dependencies)_

- `yarn run dev` _(Run dev environment)_

## BEM Linter

A BEM (Block Element Modifier) linter has been setup and will run when the `scss` code is compiled. Add your __blocks (components)__ inside the `scss/blocks` folder and __utilities__ inside `scss/utils` folder. You can also enable the linter on files outside of this default folders by adding the comment `/** @define my-component */` at the top of the file. For more info about how to define components and utilities check the [documentation](https://github.com/postcss/postcss-bem-linter#define-componentsutilities-with-a-comment).

## Versioning / Caching

A git hook is added when setting up the boilerplate for the first time that will create a file with the _build version_ every time a new commit is made.

If you are cloning this repository after the boilerplate was setup or you need to set the hook again, run the task `gulp copy_git_pre_commit_hook` to copy the hook to your git hooks folder, next time you make a new commit the build version will be updated.
