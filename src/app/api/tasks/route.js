import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Task from "@/models/Task";


export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("Incoming Task Data:", body);

    if (!body.title || !body.userId) {
      return NextResponse.json(
        { error: "Title and userId are required" },
        { status: 400 }
      );
    }
    const dueDateValue =
      body.dueDate && body.dueDate !== "" ? new Date(body.dueDate) : null;

    const newTaskData = { ...body, dueDate: dueDateValue };
    delete newTaskData._id;

    const task = await Task.create(newTaskData);
    console.log(" Task Created:", task);

   
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error(" POST /api/tasks error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create task" },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    let query = { userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let taskQuery = Task.find(query);

    if (sortBy === "dueDate") {
      taskQuery = taskQuery.sort({ dueDate: 1 });
    } else if (sortBy === "priority") {
      taskQuery = taskQuery.sort({ priority: 1 });
    }

    const tasks = await taskQuery;
    console.log(`${tasks.length} tasks fetched for user: ${userId}`);

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
