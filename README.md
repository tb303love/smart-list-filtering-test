# Angular Test Workspace

## Project description
This project uses `workspace` which gives us developers more control over how we build and ship our modules.

It makes really easy to share common features when packed in to a module, even with other developers who work on a different technology.

E.g `Express JS` with `Typescript` and `Angular` developers can benefit from `interfaces` library.

Workspace consists of libraries and projects that consume those libraries.
Libraries:
- api
  - At first glance, this might be an overkill, but let say we have other `Angular` projects that uses the same `API` services to make a successfull `REST` call.
- interfaces
  - common sharable footprints of objects that can be found in `REST` calls, helper methods, etc...
- ui
  - This library consist of reusable UI elements that can be shared among other `Angular` projects. The power comes when designing UI kits with design system specification.

Projects:
- smart-list-filtering-test
  - the projects itself that showcases feature requirements, but also how it consumes libraries mentioned above.

## Before you start
Make sure tu run `npm run build:all` before running `ng-serve`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
