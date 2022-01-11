import type {Utilities} from '@parsify/core';

/**
 * This is the wrapper function.
 * It allows you to access certain utilities like the math parser's scope and HTTP fetcher, used internally by Parsify Desktop.
 * It should return another function which will handle the logic.
 */
const wrapper = (utils: Utilities<unknown>) => {
	/**
	 * This function receives the expression, which you need to validate and either do something with it, or return the original expression (so that other plugins can use it).
	 */
	const plugin = async (expression: string): Promise<string> => {
		/**
		 * 	Users can't set individual arguments for each plugin in Parsify Desktop.
		 *	Instead, they can use the global configuration in the settings, which is based on environment variables.
		 */
		let upperCase = false;

		// Here, any truthy value of the environment variable `UPPER_CASE` will turn on the upper case conversion.
		if (process.env['UPPER_CASE']) {
			upperCase = true;
		}

		// Validate the expression to see if it should be processed by your plugin
		if (expression === 'hello') {
			if (upperCase) {
				return 'HELLO, WORLD!';
			}

			return 'hello, world!';
		}

		/**
	 	 * BONUS: utilize the math parser's scope to create a custom function that converts any expression to uppercase.
	 	 */
		utils.scope.set('toUpperCase', (expression: string) => expression.toUpperCase());

		// If the expression validation fails, just return the expression
		return expression;
	};

	return plugin;
};

export default wrapper;
