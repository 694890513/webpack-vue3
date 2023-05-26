module.exports = {
	extends: ['@commitlint/config-conventional'],
	// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
	rules: {
		'subject-case': [
			2,
			'always',
			[
				'lower-case', // default
				'upper-case', // UPPERCASE
				'camel-case', // camelCase
				'kebab-case', // kebab-case
				'pascal-case', // PascalCase
				'sentence-case', // Sentence case
				'snake-case', // snake_case
				'start-case' // Start Case
			]
		]
	}
}
