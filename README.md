# Scrapifier
**Scrapifier** is a simple tool used to help scrap websites and assess any changes to its contents on a regular basis and alert a user once any are detected.

## Getting Started
**NOTE: Work in progress**  

First step is to install the required dependencies (Chronium is required by `puppeteer` and is quite large, ~87MB):
```
npm i
```

To run the MyConcordia `grades` target, ensure to rename the example file `configs/configs.example.js` to `configs/configs.js` and fill out the `username` and `password` fields in `targets.grades.credentials` to your respective Concordia `NETNAME` and `password`.

Afterwards, simply run the following grades driver script:
```
node server/targets/grades/driver.js
```

The output of the driver script will be located inside the `grades` directory inside `grades.txt`.