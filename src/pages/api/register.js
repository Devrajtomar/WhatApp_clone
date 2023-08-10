import createNewuser from "./utils/createNewuser";
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { Name, Email, Password } = req.body;

      // Input validation
      if (
        typeof Name !== "string" ||
        typeof Email !== "string" ||
        typeof Password !== "string"
      ) {
        return res
          .status(400)
          .json({ error: "Name, Email, and Password must be strings." });
      }

      // Trim whitespaces from Name and Email
      const trimmedName = Name.trim();
      const trimmedEmail = Email.trim();

      // Check if Name and Email are empty strings after trimming
      if (!trimmedName || !trimmedEmail) {
        return res
          .status(400)
          .json({ error: "Name and Email must not be empty." });
      }

      // You can also implement more rigorous validation for Email and Password format here.

      // Register the new user
      const response = await createNewuser(trimmedName, trimmedEmail, Password);

      // Assuming createNewUser function returns a user object upon successful registration
      res.status(200).json(response);
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({
        error: "An error occurred while processing the registration.",
      });
    }
  }
};

export default handler;
