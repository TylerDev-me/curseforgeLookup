# curseforgeLookup

This script can be used in conjunction with a manifest.json file to lookup the categories of any mod in a modpack. 

To obtain a manifest.json file, follow these steps:

1. Using your chosen modpack within the Curseforge launcher, click the three dots next to the play button.
2. Click export profile, and uncheck any option except mods
3. Save the file to your desired location, within you should find a manifest.json file that can be copied into this root directory of this project.

Use of this project will require the use of a Curseforge API Key, which can be obtained here: [link](https://console.curseforge.com/#/api-keys)

## Usage Instructions:

- Copy config-example.json and rename it to config.json, replacing the placeholder text with your API key.
- Run `yarn install` and wait for dependencies to be installed.
- Upon entering `yarn run start` or `npm start`, the program will perform a lookup on the mods and create a mods.csv file that will display the following
  - Name of the mod
  - All the categories assocciated with the mod

### Credits

[node-curseforge](https://github.com/Mondanzo/node-curseforge)


