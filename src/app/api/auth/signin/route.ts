import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  if (username !== "admin" || password !== "admin") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  res.status(200).json({
    message: "POST api/auth/signin",
    data: req.body,
  });
  return NextResponse.next();
};
