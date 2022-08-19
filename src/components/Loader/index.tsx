import cn from 'classnames';
import styles from './styles.module.scss';

interface LoaderProps {
  isLoading: boolean;
}

function Loader(props: LoaderProps) {
  const { isLoading } = props;

  if (!isLoading) return null;

  return (
    <div
      className={cn('absolute top-0 right-0 bottom-0 left-0 bg-gray-600/70 flex justify-center items-center')}
    >
      <div className={cn(styles.spinner)} />
    </div>
  );
}

export default Loader;
