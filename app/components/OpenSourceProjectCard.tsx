"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { OpenSourceProject } from "@/lib/interface";
import { ExternalLink, Github, Share2 } from "lucide-react";

export default function OpenSourceProjectCard({
  project,
}: {
  project: OpenSourceProject;
}) {
  const handleShare = async () => {
    const shareData = {
      title: project.name,
      text: project.description,
      url: project.githubUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(project.githubUrl);
        alert("GitHub link copied to clipboard!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Unable to share project:", error);
      }
    }
  };

  return (
    <article
      className="group flex h-[420px] w-full max-w-[350px] flex-col
  overflow-hidden rounded-xl border border-gray-200 bg-white
  shadow-sm transition-all duration-300 hover:-translate-y-1
  hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
    >
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} on GitHub`}
      className="flex min-h-0 flex-1 flex-col focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-inset
  focus-visible:ring-blue-500"
      >
        <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {project.image ? (
            <Image
              src={urlFor(project.image)
                .width(700)
                .height(400)
                .fit("crop")
                .url()}
              alt={project.name}
              fill
              sizes="(max-width: 640px) 100vw, 350px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Github size={44} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Project information */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-violet-50 p-5 dark:bg-gray-900">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
              {project.name}
            </h3>

            <ExternalLink
              size={18}
              className="mt-1 shrink-0 text-gray-400 transition-colors group-hover:text-blue-600"
            />
          </div>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {project.description}
          </p>

          {/* Technology tags */}
          {/* {project.technologies?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-blue-100
                    bg-blue-50 px-2.5 py-1 text-xs font-medium
                    text-blue-700 dark:border-blue-900
                    dark:bg-blue-950 dark:text-blue-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          ) : null} */}
        </div>
      </a>

      {/* Share */}
    <div className="mt-auto flex shrink-0 items-center gap-3
  border-t border-gray-100 px-5 py-4 dark:border-gray-800">
        <button
          type="button"
          onClick={handleShare}
          aria-label={`Share ${project.name}`}
          title="Share project"
          className="flex h-10 w-10 shrink-0 items-center justify-center
            rounded-lg border border-gray-200 text-gray-600
            transition hover:bg-gray-100 hover:text-blue-600
            dark:border-gray-700 dark:text-gray-300
            dark:hover:bg-gray-800"
        >
          <Share2 size={18} />
        </button>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2
            rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium
            text-white transition hover:bg-blue-700
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Github size={17} />
          View on GitHub
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}