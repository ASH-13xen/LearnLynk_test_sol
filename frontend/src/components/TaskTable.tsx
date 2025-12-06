import { Task } from "@/types";

interface TaskTableProps {
  tasks: Task[];
  onMarkComplete: (taskId: string) => void;
}

export default function TaskTable({ tasks, onMarkComplete }: TaskTableProps) {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr className="gray-100">
          <th className="border p-2 text-left">Task Title</th>
          <th className="border p-2 text-left">App ID</th>
          <th className="border p-2 text-left">Due Date</th>
          <th className="border p-2 text-left">Status</th>
          <th className="border p-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="border-t">
            <td className="border p-2">{task.title}</td>
            <td className="border p-2">{task.application_id}</td>
            <td className="border p-2">
              {new Date(task.due_at).toLocaleTimeString()}
            </td>
            <td className="border p-2">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {task.status}
              </span>
            </td>
            <td className="border p-2">
              {task.status !== "completed" && (
                <button
                  onClick={() => onMarkComplete(task.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm transition-colors"
                >
                  Mark Complete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
