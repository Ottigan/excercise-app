import React from 'react';
import cn from 'classnames';
import Loader from 'components/Loader';
import styles from './styles.module.scss';

interface TableProps {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean
}

const defaultProps = {
  className: '',
  isLoading: false,
};

const Table: React.FC<TableProps> = (props) => {
  const { children, className, isLoading } = props;

  return <div className="relative">
    {isLoading && <Loader isLoading={isLoading}/>}
    <table className={cn('bg-slate-100', className, styles.table)}>{children}</table>
  </div>;
};

Table.defaultProps = defaultProps;

export default Table;
