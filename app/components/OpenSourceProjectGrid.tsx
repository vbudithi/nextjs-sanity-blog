
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
      <p className="py-12 text-center text-gray-500">
        Loading open-source projects...
      </p>
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
        No open-source projects found.
      </p>
    );
  }

  return (
    // <section className="w-full">
    //   <div className="mb-8">
    //     <h2 className="text-2xl font-bold">
    //       Open Source AI Projects
    //     </h2>
    //     <p className="mt-2 text-gray-500">
    //       Discover useful open-source projects and explore their repositories.
    //     </p>
    //   </div>

    //   <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
    //     {projects.map((project) => (
    //       <article
    //         key={project._id}
    //         className="flex w-full max-w-[350px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
    //       >
    //         {project.image && (
    //           <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
    //             <Image
    //               src={urlFor(project.image)
    //                 .width(700)
    //                 .height(400)
    //                 .fit("crop")
    //                 .url()}
    //               alt={project.name}
    //               fill
    //               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
    //               className="object-cover"
    //             />
    //           </div>
    //         )}

    //         <div className="flex flex-1 flex-col p-5">
    //           <h3 className="text-lg font-semibold">
    //             {project.name}
    //           </h3>

    //           <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
    //             {project.description}
    //           </p>

    //           {project.technologies &&
    //             project.technologies.length > 0 && (
    //               <div className="mt-4 flex flex-wrap gap-2">
    //                 {project.technologies.map((technology) => (
    //                   <span
    //                     key={technology}
    //                     className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300"
    //                   >
    //                     {technology}
    //                   </span>
    //                 ))}
    //               </div>
    //             )}

    //           <div className="mt-auto flex items-center justify-between gap-3 pt-6">
    //             <a
    //               href={project.githubUrl}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
    //             >
    //               <Github size={16} />
    //               View on GitHub
    //               <ExternalLink size={14} />
    //             </a>
    //           </div>
    //         </div>
    //       </article>
    //     ))}
    //   </div>
    // </section>

    <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
  {projects.map((project) => (
    <OpenSourceProjectCard
      key={project._id}
      project={project}
    />
  ))}
</div>
  );
}
