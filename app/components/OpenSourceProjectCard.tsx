
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
    <article className="flex w-full max-w-[350px] flex-col
      overflow-hidden rounded-xl border border-gray-200
      bg-white shadow-sm transition-shadow hover:shadow-lg
      dark:border-gray-700 dark:bg-gray-900">

      {project.image ? (
        <div className="relative h-40 w-full bg-gray-100 dark:bg-gray-800">
          <Image
            src={urlFor(project.image)
              .width(700)
              .height(400)
              .fit("crop")
              .url()}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, 350px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Github size={40} className="text-gray-400" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">
          {project.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {project.description}
        </p>

        {project.technologies?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs
                  text-blue-700 dark:bg-blue-950 dark:text-blue-300"
              >
                {technology}
              </span>
            ))}
          </div>
        ) : null}

      
<div className="mt-auto flex items-center gap-3 pt-6">
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
    className="inline-flex flex-1 items-center justify-center
      gap-2 rounded-lg bg-blue-600 px-4 py-2
      text-sm font-medium text-white transition hover:bg-blue-700"
  >
    <Github size={16} />
    View on GitHub
    <ExternalLink size={14} />
  </a>
</div>
      </div>
    </article>
  );
}
