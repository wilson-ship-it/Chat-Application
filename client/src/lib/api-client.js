import axios from "axios";
import { HOST } from "../utils/constants";

export const apiclient=axios.create({
baseURL:HOST,
});

// axios.post(
//   "http://localhost:8000/api/auth/signup",
//   { email, password }
// );
