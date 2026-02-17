"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type ProjectItem = {
  id: number;
  title: string;
  description: string;
  detailDescription?: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  portfolioUrl?: string;
};

type ProjectDialogProps = {
  projects: ProjectItem[];
};

export function ProjectDialog({ projects }: ProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const handleOpen = (project: ProjectItem) => {
    setSelected(project);
    setOpen(true);
  };

  const body = selected?.detailDescription ?? selected?.description ?? "";

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.id}>
            <Card
              className="h-full cursor-pointer overflow-hidden pt-0 transition-shadow hover:shadow-md"
              onClick={() => handleOpen(project)}
            >
              <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-xl bg-muted">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto pt-12 sm:max-w-2xl">
          {selected && (
            <>
              <div className="relative h-40 w-full overflow-hidden rounded-md bg-muted sm:h-44">
                <Image
                  src={selected.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 512px"
                />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl">{selected.title}</DialogTitle>
                <DialogDescription asChild>
                  <p className="whitespace-pre-line pt-1 text-muted-foreground">
                    {body}
                  </p>
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 py-2">
                {selected.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 border-t border-border pt-4">
                {selected.githubUrl && (
                  <Button asChild variant="default" size="sm">
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Button>
                )}
                {selected.portfolioUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={selected.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      포트폴리오 / 배포 주소
                    </a>
                  </Button>
                )}
                {!selected.githubUrl && !selected.portfolioUrl && (
                  <p className="text-sm text-muted-foreground">
                    링크를 추가하려면 프로젝트 데이터에 githubUrl, portfolioUrl을
                    넣어주세요.
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
