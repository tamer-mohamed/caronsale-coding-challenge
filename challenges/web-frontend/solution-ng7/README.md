# CarOnSale with angular@7

The project is built with Angular@7 and ng-zorro@7.5 (Ant-design with Angular)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Next steps / possible improvements

- Fix marked TODOS
- Define `api-request` service as a thin layer for API calls for i.e global error handling, request intercepts
- Handle `401` error response to redirect the user to login page when token is expired
- Apply linting rules with perttier 
- Favor absolute imports over relative imports (i.e `shared/services`)
- Increase the test coverage to 100%  and add E2E tests.
- Create css utils via less mixins to apply (i.e spacings, typography ... etc) 

>> The app Folder structure is very simple at the moment, we may need another structure, based on the app size and context.


