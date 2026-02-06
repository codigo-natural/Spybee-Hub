"use client";

import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useProjectStore } from "@/lib/store";
import { useFilteredProjects } from "@/hooks/useFilteredProjects";
import { SearchX } from "lucide-react";
import { PLAN_TYPES, STATUS_TYPES, INCIDENT_TAGS, UI_CONSTANTS } from "@/lib/constants";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/Pagination";
import styles from "./ProjectList.module.css";

const getPlanBadgeClass = (plan) => {
  const planMap = {
    [PLAN_TYPES.BIG]: styles.badgePremium,
    [PLAN_TYPES.SMALL]: styles.badgePequeno
  }
  return planMap[plan] || styles.badgeAvanzado
}

const getStatusBadgeClass = (status) => {
  return status === STATUS_TYPES.ACTIVE ? styles.statusActive : styles.statusInactive
}

export const ProjectList = () => {
  const {
    currentPage,
    setCurrentPage,
    selectedProject,
    setSelectedProject,
    searchQuery,
  } = useProjectStore();

  const { projects: paginatedProjects, totalPages, hasResults } = useFilteredProjects();

  if (!hasResults && searchQuery) {
    return (
      <section className={styles.emptyState}>
        <SearchX size={UI_CONSTANTS.EMPTY_STATE_ICON_SIZE} className={styles.emptyIcon} aria-hidden="true" />
        <h3 className={styles.emptyTitle}>No se encontraron proyectos</h3>
        <p className={styles.emptyText}>
          Intenta con otros términos de búsqueda
        </p>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.headerRow} role="row">
        <div>Proyecto</div>
        <div>Plan</div>
        <div>Estado</div>
        <div>Equipo</div>
        <div>Items por vencer</div>
      </div>
      <div className={styles.rowContainer}>
        {paginatedProjects.map((project) => (
          <article
            key={project._id}
            className={`${styles.projectRow} ${selectedProject?._id === project._id ? styles.selectedRow : ""
              }`}
            onClick={() => setSelectedProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelectedProject(project)
              }
            }}
          >
            <div className={styles.userContainer}>
              {project.img && (
                <Image
                  src={project.img}
                  alt={project.title}
                  width={UI_CONSTANTS.IMAGE_SIZE.SMALL}
                  height={UI_CONSTANTS.IMAGE_SIZE.SMALL}
                  unoptimized
                />
              )}
              <div>
                <div className={styles.projectTitle}>{project.title}</div>
                <time className={styles.dateText} dateTime={project.lastVisit}>
                  {format(new Date(project.lastVisit), "d MMM yyyy", {
                    locale: es,
                  })}
                </time>
              </div>
            </div>
            <div className={`${styles.badge} ${getPlanBadgeClass(project.projectPlanData.plan)}`}>
              {project.projectPlanData.plan}
            </div>
            <div className={`${styles.badge} ${getStatusBadgeClass(project.status)}`}>
              {project.status}
            </div>
            <div className={styles.avatars}>
              {project.users.slice(0, UI_CONSTANTS.MAX_VISIBLE_AVATARS).map((user, index) => (
                <div key={index} className={styles.avatar} title={`${user.name} ${user.lastName}`}>
                  {user.name[0]}
                  {user.lastName[0]}
                </div>
              ))}
              {project.users.length > UI_CONSTANTS.MAX_VISIBLE_AVATARS && (
                <div className={styles.extraAvatar}>
                  +{project.users.length - UI_CONSTANTS.MAX_VISIBLE_AVATARS}
                </div>
              )}
            </div>
            <div className={styles.statsContainer}>
              <div>
                <div className={styles.statTitle}>{project.incidents.length}</div>
                <div className={styles.statLabel}>Incidencias</div>
              </div>
              <div>
                <div className={styles.statTitle}>
                  {project.incidents.filter((i) => i.tag === INCIDENT_TAGS.RFI).length}
                </div>
                <div className={styles.statLabel}>RFI</div>
              </div>
              <div>
                <div className={styles.statTitle}>
                  {project.incidents.filter((i) => i.tag === INCIDENT_TAGS.TASK).length}
                </div>
                <div className={styles.statLabel}>Tareas</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
          />

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={currentPage === pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationNext
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
        </PaginationContent>
      </Pagination>
    </section>
  );
};
