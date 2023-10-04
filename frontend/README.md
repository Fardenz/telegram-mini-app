## Summary

@ Route mapping -> Update tsconfig.json and tsconfig.vite.json, just like all the rest, to use the new path aliases. 

### Add new view 

Routing handler in /routes: 
  -  Create new route in paths.ts
  -  add route to router, if header needed ensure to include the MainLayout component
  -  Create view in views folder
  -  And thats it, happy coding!

## Usage
### Build the docker container
  make build
### Start serving the aplication 
  make start
### Stop serving the aplication
  make stop
### Remove the docker container
  make down
### Run all tests
  make test
### Exec always before commit
  make before-commit

## Environments

- Development: File .env.development on env folder.
- Production: File .env.production on env folder.

Create this two files and copy the info of the .env.example file