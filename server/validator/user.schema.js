const { z } = require("zod");

const createUserSchema = z.object({
  username: z
    .string({
      required_error: "username is required and must contain character",
    })
    .trim()
    .min(3, { message: "username must contain 3 character" })
    .max(30, { message: "username should not exceed 30 character" }),

  email: z
    .string({
      required_error: "username is required and must contain character",
    })
    .trim()
    .min(3, { message: "username must contain 3 character" })
    .max(30, { message: "username should not exceed 30 character" })
    .email({ message: "not a valid email format" }),
});

export default createUserSchema;
