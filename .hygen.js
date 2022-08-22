const inflection = require('inflection');
const path = require('path');

module.exports = {
  helpers: {
    camelizedPathName: (name, lower = false) => {
      // The camelize function only transforms underscores, so convert dashes to underscores
      name = name.replace(/-/g, '_');
      return inflection.camelize(name, lower).replace(/::/g, '/');
    },
    /**
     * Converts a name to use camel case where the first character is uppercase
     *
     * Examples:
     *   - classify("card") => "Card"
     *   - classify("cards") => "Cards"
     *   - classify("card-dash") => "CardDash"
     *   - classify("card_underscore") => "CardUnderscore"
     *   - classify("CardPascalCase") => "CardPascalCase"
     *   - classify("some/path/card", true) => "Card"
     *
     * @param {string} name
     * @param {boolean} useBaseName - Pass true if `name` is a nested file path
     */
    classify: (name, useBaseName = false) => {
      return (useBaseName ? path.parse(name).base : name)
        .split(/[^A-Za-z0-9]/)
        .map((part) => inflection.camelize(part))
        .join('');
    },
  },
  promptName:
    (message = 'Name?') =>
    ({ prompter, args }) => {
      if (args.name?.length) {
        return Promise.resolve();
      }
      return prompter.prompt({
        type: 'input',
        name: 'name',
        message,
      });
    },
};
