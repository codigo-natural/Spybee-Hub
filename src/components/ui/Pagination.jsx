import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import styles from './Pagination.module.css';

const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={[styles.pagination, className].filter(Boolean).join(' ')}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <ul
      ref={ref}
      className={[styles.paginationContent, className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
});
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <li
      ref={ref}
      className={[styles.paginationItem, className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
});
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = ({ className, isActive, disabled, size, ...props }) => {
  const linkClasses = [
    styles.paginationLink,
    isActive ? styles.paginationLinkActive : styles.paginationLinkDefault,
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={linkClasses}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={disabled ? (e) => e.preventDefault() : props.onClick}
      {...props}
    />
  );
};
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = (props) => {
  const { className, disabled, ...rest } = props;
  const prevClasses = [styles.paginationPrevious, disabled ? styles.disabled : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={prevClasses}
      disabled={disabled}
      {...rest}
    >
      <ChevronLeft className={styles.icon} />
      <span>Previous</span>
    </PaginationLink>
  );
};
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = (props) => {
  const { className, disabled, ...rest } = props;
  const nextClasses = [styles.paginationNext, disabled ? styles.disabled : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={nextClasses}
      disabled={disabled}
      {...rest}
    >
      <span>Next</span>
      <ChevronRight className={styles.icon} />
    </PaginationLink>
  );
};
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = (props) => {
  const { className, ...rest } = props;
  return (
    <span
      aria-hidden
      className={[styles.paginationEllipsis, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <MoreHorizontal className={styles.icon} />
      <span className="sr-only">More pages</span>
    </span>
  );
};
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
