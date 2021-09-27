```bash
# install dependencies
lerna bootstrap

# development
npm run dev #lerna run dev --scope @webpack5-react-module-federation/app1 for app1

# production
npm run build #lerna run build --scope @webpack5-react-module-federation/app1 for app1

# serve
npm run serve #lerna run serve --scope @webpack5-react-module-federation/app1 for app1

# clean dist
npm run clean
```