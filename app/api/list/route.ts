import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

type Body = z.infer<typeof schema>;

const schema = z.object({
  name: z.string(),
  ownerId: z.string(),
  members: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) return NextResponse.json({}, { status: 400 });
  const { ownerId, name, members } = body;
  const newList = await prisma.list.create({
    data: {
      name,
      ownerId,
      members: JSON.stringify(members),
    },
  });
  return NextResponse.json({ id: newList.id, name, members }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  const records = await prisma.list.findMany({ where: { ownerId: userId } });
  const response = records.map((record) => ({
    id: record.id,
    name: record.name,
    members: JSON.parse(record.members),
  }));
  return NextResponse.json(response);
}
