import styles from './CircularProgressBar.module.css';

export const CircularProgressBar = ({ percent = 0, size = 200, children }) => {
  const normalizedPercent = Math.min(100, Math.max(0, percent));
  const deg = (360 * normalizedPercent) / 100;
  const isGreaterThan50 = normalizedPercent > 50;

  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    '--size': `${size}px`,
    '--rotation': `${deg}deg`,
  };

  return (
    <div
      className={`${styles.progressPieChart} ${isGreaterThan50 ? styles.gt50 : ''}`}
      style={containerStyle}
      data-percent={normalizedPercent}
    >
      <div className={styles.ppcProgress}>
        <div className={styles.slice}>
          <div className={styles.bar} style={{ transform: `rotate(${deg}deg)` }}></div>
          <div className={styles.fill}></div>
        </div>
      </div>
      <div className={styles.ppcPercents}>
        <div className={styles.pccPercentsWrapper}>
          <span>{children || `${normalizedPercent}%`}</span>
        </div>
      </div>
    </div>
  );
};
