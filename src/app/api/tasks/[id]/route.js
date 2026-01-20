import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Task from "@/models/Task";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = params; 
    const body = await req.json();

    console.log("Task ID param:", id);

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTask, { status: 200 });

  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params; 
    console.log("Task ID param:", id);

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
