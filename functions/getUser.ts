import axios from "axios";
import { User } from "../interfaces/user";

export default async function getUser(token: string): Promise<User | null> {
  try {
    let response = await axios.get(`https://discord.com/api/v10/users/@me`, {
      headers: {
        Authorization: token,
      },
    });

    let { data } = response;

    let createdTimestamp = (BigInt(data.id) >> BigInt("22")) + BigInt("1420070400000");
    data.created_at = Number(createdTimestamp);

    return data;
  } catch (err) {
    return null;
  }
}
