"use client";

import { useProjectStore } from "@/lib/store";
import { CalendarDays, History, Presentation, ChevronRight, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CircularProgressBar } from "../ui/CircularProgressBar";
import styles from "./ProjectSidebar.module.css";

export const ProjectSidebar = () => {
  const { selectedProject, isSidebarCollapsed, setIsSidebarCollapsed } = useProjectStore();

  if (!selectedProject) return null;

  const incidentsCount = selectedProject.incidents.filter(i => i.item === "incidents").length;
  const rfiCount = selectedProject.incidents.filter(i => i.item === "RFI").length;
  const tasksCount = selectedProject.incidents.filter(i => i.item === "task").length;

  const closedIncidents = selectedProject.incidents.filter(i => i.item === "incidents" && i.status === "close").length;
  const closedRFIs = selectedProject.incidents.filter(i => i.item === "RFI" && i.status === "close").length;
  const closedTasks = selectedProject.incidents.filter(i => i.item === "task" && i.status === "close").length;
  const calculateProgress = (closed, total) => {
    if (total === 0) return 0;
    return Math.round((closed / total) * 100);
  };

  const progresses = [
    calculateProgress(closedIncidents, incidentsCount),
    calculateProgress(closedRFIs, rfiCount),
    calculateProgress(closedTasks, tasksCount)
  ];

  const labels = ["Incidencias", "RFI", "Tareas"];

  return (
    <div className={styles.sidebarWrapper}>
      <button
        className={styles.sidebarToggle}
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        aria-label={isSidebarCollapsed ? "Mostrar resumen" : "Ocultar resumen"}
        title={isSidebarCollapsed ? "Mostrar resumen" : "Ocultar resumen"}
      >
        <ChevronLeft className={isSidebarCollapsed ? '' : styles.rotated} />
      </button>

      {!isSidebarCollapsed && (
        <div className={styles.container}>
          <div className={styles.inner}>
            <header className={styles.header}>
              <h2 className={styles.title}>
                <Presentation />
                Resumen
              </h2>
            </header>

            <div className={styles.tabs}>
              {["General", "Mis actualizaciones", "Filtros"].map((item) => (
                <button key={item} className={styles.tab}>
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>
                  <History />
                  Próximos a vencer</h3>
                <button className={styles.viewAll}>Ver todos</button>
              </div>

              <div className={styles.cardContainer}>
                {[incidentsCount, rfiCount, tasksCount].map((count, index) => (
                  <div key={labels[index]} className={styles.card}>
                    <div className={styles.cardSubtitle}>{labels[index]}</div>
                    <div className={styles.cardCount}>{count}</div>
                    <div className={styles.cardFooter}>
                      Total Abiertas
                    </div>
                    <CircularProgressBar percent={progresses[index]} size={60}>
                      {progresses[index]}
                    </CircularProgressBar>
                  </div>
                ))}
              </div>

              <div className={styles.incidentList}>
                <header className={styles.incidentHeader}>
                  <span>Proyecto</span>
                  <span>Item</span>
                  <span>Fecha límite</span>
                </header>
                {selectedProject.incidents.slice(0, 3).map((incident) => (
                  <div key={incident._id} className={styles.incidentItem}>
                    <div className={styles.incidentInfo}>
                      <div className={styles.projectName}>{selectedProject.title}</div>
                      <div className={styles.incidentDesc}>{incident.description}</div>
                    </div>
                    <div className={styles.incidentType}>
                      {incident.item}
                    </div>
                    <div className={styles.incidentDate}>
                      {format(new Date(incident.limitDate), "dd/MM/yyyy", { locale: es })}
                      <div className={styles.incidentTime}>
                        {format(new Date(incident.limitDate), "HH:mm:ss")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>
                  <CalendarDays strokeWidth={1} />
                  Próximos eventos</h3>
                <button className={styles.viewAll}>Ver todos</button>
              </div>

              <div className={styles.eventList}>
                {selectedProject.incidents.slice(0, 3).map((incident) => (
                  <div key={incident._id} className={styles.incidentItem}>
                    <div className={styles.incidentInfo}>
                      <div className={styles.projectName}>{selectedProject.title}</div>
                      <div className={styles.incidentDesc}>{incident.description}</div>
                    </div>
                    <div className={styles.eventUser}>
                      <div className={styles.userAvatar}>
                        {selectedProject.users[0]?.name[0]}
                        {selectedProject.users[0]?.lastName[0]}
                      </div>
                      <div className={styles.eventDate}>
                        {format(new Date(incident.limitDate), "dd/MM/yyyy", { locale: es })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
