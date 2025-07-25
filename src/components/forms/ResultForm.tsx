"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createResult, updateResult } from "@/lib/actions";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas";

const ResultForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
    defaultValues: data
      ? {
          ...data,
          examId: data.examId || undefined,
          assignmentId: data.assignmentId || undefined,
        }
      : undefined,
  });

  // Use the SAME state type as your ParentForm
  const [state, formAction] = useFormState(
    type === "create" ? createResult : updateResult,
    {
      success: false,
      error: false, // This should match what your other actions return
    }
  );

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  useEffect(() => {
    if (state.success) {
      toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { students, exams, assignments } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new result" : "Update the result"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        {/* Student Selection */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 font-medium">Student</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentId")}
            defaultValue={data?.studentId}
          >
            <option value="">Select a student</option>
            {students?.map(
              (student: { id: string; name: string; surname: string }) => (
                <option value={student.id} key={student.id}>
                  {student.name} {student.surname}
                </option>
              )
            )}
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">
              {errors.studentId.message.toString()}
            </p>
          )}
        </div>

        {/* Score */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 font-medium">Score</label>
          <input
            type="number"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("score", { valueAsNumber: true })}
            defaultValue={data?.score}
            min="0"
            max="100"
          />
          {errors.score?.message && (
            <p className="text-xs text-red-400">
              {errors.score.message.toString()}
            </p>
          )}
        </div>

        {/* Assessment Type Selection */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 font-medium">
            Assessment Type
          </label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            onChange={(e) => {
              const form = e.target.form;
              const examSelect = form?.querySelector(
                'select[name="examId"]'
              ) as HTMLSelectElement;
              const assignmentSelect = form?.querySelector(
                'select[name="assignmentId"]'
              ) as HTMLSelectElement;

              if (e.target.value === "exam") {
                assignmentSelect.value = "";
              } else if (e.target.value === "assignment") {
                examSelect.value = "";
              }
            }}
            defaultValue={
              data?.examId ? "exam" : data?.assignmentId ? "assignment" : ""
            }
          >
            <option value="">Select assessment type</option>
            <option value="exam">Exam</option>
            <option value="assignment">Assignment</option>
          </select>
        </div>

        {/* Exam Selection */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 font-medium">
            Exam (Optional)
          </label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("examId")}
            defaultValue={data?.examId || ""}
          >
            <option value="">Select an exam</option>
            {exams?.map(
              (exam: {
                id: number;
                title: string;
                lesson: { name: string };
              }) => (
                <option value={exam.id} key={exam.id}>
                  {exam.title} ({exam.lesson.name})
                </option>
              )
            )}
          </select>
          {errors.examId?.message && (
            <p className="text-xs text-red-400">
              {errors.examId.message.toString()}
            </p>
          )}
        </div>

        {/* Assignment Selection */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 font-medium">
            Assignment (Optional)
          </label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("assignmentId")}
            defaultValue={data?.assignmentId || ""}
          >
            <option value="">Select an assignment</option>
            {assignments?.map(
              (assignment: {
                id: number;
                title: string;
                lesson: { name: string };
              }) => (
                <option value={assignment.id} key={assignment.id}>
                  {assignment.title} ({assignment.lesson.name})
                </option>
              )
            )}
          </select>
          {errors.assignmentId?.message && (
            <p className="text-xs text-red-400">
              {errors.assignmentId.message.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Hidden ID field for updates */}
      {data && <input type="hidden" {...register("id")} value={data.id} />}

      {/* Error display - matching ParentForm pattern */}
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ResultForm;
