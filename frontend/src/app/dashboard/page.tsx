"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import TaskTable from "@/components/TaskTable";
import { Task } from "@/types";

export default function TodayTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .gte("due_at", startOfDay.toISOString())
      .lte("due_at", endOfDay.toISOString())
      .order("due_at", { ascending: true });

    if (error) {
      setError("Failed to fetch tasks");
      console.error(error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, []);

  // --- Logic for the Action Button ---
  const markComplete = async (taskId: string) => {
    // 1. Optimistic Update (Instant UI change)
    const originalTasks = [...tasks];
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: "completed" } : t))
    );

    // 2. API Call
    const { error } = await supabase
      .from("tasks")
      .update({ status: "completed" })
      .eq("id", taskId);

    // 3. Error Handling
    if (error) {
      alert("Failed to update task");
      setTasks(originalTasks); // Revert UI
    } else {
      // Optional: fetchTasks(); // Re-fetch to confirm
    }
  };

  if (loading) return <div className="p-4">Loading tasks...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tasks Due Today</h1>

      {tasks.length === 0 ? (
        <p>No tasks due today.</p>
      ) : (
        /* Pass the function down as a prop */
        <TaskTable tasks={tasks} onMarkComplete={markComplete} />
      )}
    </div>
  );
}
