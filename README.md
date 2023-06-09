# amplicode-addon-email-templates

### Bump Package Version
Note that this command creates git commit with new version tag.
```shell
npm version patch
```

Without commit tag to git:
```shell
npm version patch --no-git-tag-version
```

### Build Npm Package
```shell
npm run clean && npm run compile && npm pack -q
```

### Adding Addon to Generated App
- bump package version
- build npm package
- copy built `.tgz` file to generated app
```shell
cp amplicode-addon-email-templates-X.Y.Z.tgz /path/to/generated/app
```
- install `.tgz` file to app
```shell
cd /path/to/generated/app
npm install -s amplicode-addon-email-templates-X.Y.Z.tgz 
```