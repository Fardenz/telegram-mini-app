module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:testing-library/react"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "testing-library"
    ],
    "rules": {
        "no-comments": "error",
        "no-console": "error",
        "no-undef": "off",
        "quote-props": ["error", "consistent"],
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "testing-library/await-async-utils": "error",
        "testing-library/await-async-query": "error",
		"testing-library/no-await-sync-query": "error",
		"testing-library/no-debugging-utils": "error",
		"testing-library/no-dom-import": "off",
        "testing-library/no-wait-for-multiple-assertions": "off",
        "testing-library/no-render-in-setup": "off",
        "testing-library/no-unnecessary-act": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/typedef": [
          "error",
          {
            memberVariableDeclaration: true,
            parameter: true,
            propertyDeclaration: true,
          },
        ],
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
