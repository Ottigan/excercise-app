import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface TableProps {
  className?: string;
    children: React.ReactNode;
}

const defaultProps = {
  className: '',
};

const Table: React.FC<TableProps> = (props) => {
  const { children, className } = props;

  return <table className={cn('bg-slate-100', className, styles.table)}>{children}</table>;
};

Table.defaultProps = defaultProps;

export default Table;
