import { env } from "./";

describe("env", () => {
	it("Should return object with key/value pairs for each environment variable", () => {
		expect(env).toHaveProperty("AUTH0_DOMAIN");
		expect(env).toHaveProperty("AUTH0_CLIENT_ID");
		expect(env).toHaveProperty("CLERK_PUBLISHABLE_KEY");
		expect(env).toHaveProperty("TWO_FACTOR_AUTH_FLOW");
	});
});
