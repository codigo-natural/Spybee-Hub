'use client'

import { ProjectList } from "./ProjectList";
import { ProjectMap } from "./ProjectMap";
import { ProjectSidebar } from "./ProjectSidebar";
import { useProjectStore } from "@/lib/store";
import styles from "./ProjectLayout.module.css";

export const ProjectLayout = () => {
  const { selectedProject, isSidebarCollapsed } = useProjectStore()

  if (!selectedProject) {
    return (
      <main className={styles.fullWidthContainer}>
        <ProjectList />
      </main>
    )
  }

  return (
    <main className={`${styles.outerContainer} ${isSidebarCollapsed ? styles.sidebarHidden : ''}`}>
      <div className={styles.leftColumn}>
        <ProjectMap />
        <ProjectList />
      </div>
      <aside className={styles.rightColumn}>
        <ProjectSidebar />
      </aside>
    </main>
  );
};
