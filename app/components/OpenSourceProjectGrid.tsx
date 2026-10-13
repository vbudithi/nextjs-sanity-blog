"use client";

import { useEffect, useState } from "react";
import { OpenSourceProject } from "@/lib/interface";
import OpenSourceProjectCard from "./OpenSourceProjectCard";

export default function OpenSourceProjectGrid() {
  const [projects, setProjects] = useState<OpenSourceProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/open-source-projects");

        if (!response.ok) {
          throw new Error("Failed to load projects.");
        }

        const data: OpenSourceProject[] = await response.json();
        setProjects(data);
      } catch (err) {
        setError("Unable to load projects. Please try again.");
        console.error("Error fetching open-source projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

 if (loading) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-[420px] animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="h-44 bg-gray-200 dark:bg-gray-800" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mt-6 h-10 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

  if (error) {
    return (
      <p className="py-12 text-center text-red-500">
        {error}
      </p>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        No open-source projects found. Add and publish projects in Sanity Studio.
      </p>
    );
  }

  return (
    <section className="w-full">
      {/* Mobile: horizontal scrolling */}
      <div className="-mx-4 sm:hidden">
        <div
          className="flex snap-x snap-mandatory gap-4
            overflow-x-auto overscroll-x-contain
            px-4 pb-4"
        >
          {projects.map((project) => (
            <div
              key={project._id}
              className="w-[82vw] max-w-[350px] flex-none snap-start"
            >
              <OpenSourceProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet and desktop: responsive grid */}
      <div
        className="hidden grid-cols-2 gap-6
          sm:grid lg:grid-cols-3 lg:gap-8
          2xl:grid-cols-4"
      >
        {projects.map((project) => (
          <OpenSourceProjectCard
            key={project._id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}