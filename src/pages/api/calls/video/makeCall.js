export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("Make a Call Please!");
  } else {
    console.log("Not Permited!");
  }
}
