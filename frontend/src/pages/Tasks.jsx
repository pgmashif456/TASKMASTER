import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import {
  getAllTasksApi,
  getMyTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  updateTaskStatusApi,
} from "../services/taskService.js";
import { TaskCard } from "../components/tasks/TaskCard.jsx";
import { TaskTable } from "../components/tasks/TaskTable.jsx";
import { TaskFormModal } from "../components/tasks/TaskFormModal.jsx";
import { TaskDetailModal } from "../components/tasks/TaskDetailModal.jsx";
import { ConfirmationDialog } from "../components/common/ConfirmationDialog.jsx";
import { SearchBar } from "../components/common/SearchBar.jsx";
import { FilterDropdown } from "../components/common/FilterDropdown.jsx";
import { SkeletonGrid } from "../components/common/SkeletonLoader.jsx";
import { EmptyState } from "../components/common/EmptyState.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
} from "react-icons/fi";

export const Tasks = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [order, setOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [detailTask, setDetailTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  // Open create modal if URL query has create=true
  useEffect(() => {
    if (searchParams.get("create") === "true" && isAdmin) {
      setEditingTask(null);
      setIsFormOpen(true);
      setSearchParams({});
    }
  }, [searchParams, isAdmin, setSearchParams]);

  // Fetch Tasks Query
  const {
    data: tasksResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "tasks",
      isAdmin ? "admin" : "student",
      page,
      limit,
      debouncedSearch,
      status,
      priority,
      sortBy,
      order,
    ],
    queryFn: async () => {
      if (isAdmin) {
         const params = {
  page,
  limit,
  sortBy,
  order,
};

if (debouncedSearch) params.search = debouncedSearch;
if (status) params.status = status;
if (priority) params.priority = priority;

const res = await getAllTasksApi(params);
        return res.data; // { totalTasks, currentPage, totalPages, limit, tasks }
      } else {
        const res = await getMyTasksApi();
        let list = res.data || [];

        // Client-side filtering & sorting for student assigned tasks
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase();
          list = list.filter(
            (t) =>
              t.title.toLowerCase().includes(q) ||
              (t.description && t.description.toLowerCase().includes(q))
          );
        }
        if (status) {
          list = list.filter((t) => t.status === status);
        }
        if (priority) {
          list = list.filter((t) => t.priority === priority);
        }

        // Sort
        list.sort((a, b) => {
          let valA = a[sortBy] || "";
          let valB = b[sortBy] || "";
          if (valA < valB) return order === "ASC" ? -1 : 1;
          if (valA > valB) return order === "ASC" ? 1 : -1;
          return 0;
        });

        return {
          totalTasks: list.length,
          currentPage: 1,
          totalPages: 1,
          limit: list.length,
          tasks: list,
        };
      }
    },
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      toast.success("Task created successfully!");
      setIsFormOpen(false);
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["dashboard"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create task.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTaskApi(id, data),
    onSuccess: () => {
      toast.success("Task updated successfully!");
      setIsFormOpen(false);
      setEditingTask(null);
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["dashboard"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update task.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      toast.success("Task moved to trash (soft deleted).");
      setDeletingTask(null);
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["dashboard"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete task.");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateTaskStatusApi(id, status),
    onSuccess: () => {
      toast.success("Task status updated!");
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["dashboard"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update status.");
    },
  });

  // Handlers
  const handleCreateOrUpdate = (formData) => {
    if (editingTask) {
      updateMutation.mutate({ id: editingTask.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(field);
      setOrder("ASC");
    }
  };

  const tasks = tasksResponse?.tasks || [];
  const totalTasks = tasksResponse?.totalTasks || 0;
  const totalPages = tasksResponse?.totalPages || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isAdmin ? "Task Management Workspace" : "Assigned Task List"}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {isAdmin
              ? "Create, edit, assign, and organize system tasks with live filters."
              : "Review and update the execution status of your assigned tasks."}
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <FiPlus className="w-5 h-5" />
            <span>Create Task</span>
          </button>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title or description..."
        />

        {/* Dropdowns & View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown
            label="Status"
            value={status}
            onChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
            options={[
              { label: "All Statuses", value: "" },
              { label: "Pending", value: "PENDING" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Completed", value: "COMPLETED" },
            ]}
          />

          <FilterDropdown
            label="Priority"
            value={priority}
            onChange={(val) => {
              setPriority(val);
              setPage(1);
            }}
            options={[
              { label: "All Priorities", value: "" },
              { label: "High", value: "HIGH" },
              { label: "Medium", value: "MEDIUM" },
              { label: "Low", value: "LOW" },
            ]}
          />

          <FilterDropdown
            label="Sort By"
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            icon={FiCalendar}
            options={[
              { label: "Due Date", value: "dueDate" },
              { label: "Created Date", value: "createdAt" },
              { label: "Title", value: "title" },
              { label: "Priority", value: "priority" },
              { label: "Status", value: "status" },
            ]}
          />

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-800"
              }`}
              title="Table View"
            >
              <FiList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-800"
              }`}
              title="Grid View"
            >
              <FiGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <SkeletonGrid count={6} />
      ) : isError ? (
        <div className="p-6 bg-rose-50 text-rose-700 rounded-2xl text-sm font-medium border border-rose-100">
          Failed to load tasks. Please retry.
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks match criteria"
          description="Try clearing filters or search terms to see more tasks."
          actionButton={
            isAdmin && (
              <button
                onClick={() => {
                  setEditingTask(null);
                  setIsFormOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700"
              >
                Create Task
              </button>
            )
          }
        />
      ) : viewMode === "table" ? (
        <TaskTable
          tasks={tasks}
          isAdmin={isAdmin}
          sortBy={sortBy}
          order={order}
          onSort={handleSort}
          onView={(t) => setDetailTask(t)}
          onEdit={(t) => {
            setEditingTask(t);
            setIsFormOpen(true);
          }}
          onDelete={(t) => setDeletingTask(t)}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              isAdmin={isAdmin}
              onView={(item) => setDetailTask(item)}
              onEdit={(item) => {
                setEditingTask(item);
                setIsFormOpen(true);
              }}
              onDelete={(item) => setDeletingTask(item)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls (Admin Server Pagination or Student Footer) */}
      {isAdmin && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <div className="text-xs font-medium text-slate-500">
            Showing Page <span className="font-bold text-slate-800">{page}</span> of{" "}
            <span className="font-bold text-slate-800">{totalPages}</span> ({totalTasks} total tasks)
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
              title="Previous Page"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold px-3 text-slate-700">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
              title="Next Page"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Create / Edit Form Modal */}
      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Detail Modal */}
      <TaskDetailModal
        isOpen={!!detailTask}
        onClose={() => setDetailTask(null)}
        task={detailTask}
      />

      {/* Soft Delete Confirmation Modal */}
      <ConfirmationDialog
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={() => deletingTask && deleteMutation.mutate(deletingTask.id)}
        title="Move Task to Trash?"
        message={`Are you sure you want to soft delete "${deletingTask?.title}"? You can restore it later from the trash.`}
        confirmText="Move to Trash"
        confirmVariant="danger"
        isLoading={deleteMutation.isPending}
      />
    </motion.div>
  );
};
