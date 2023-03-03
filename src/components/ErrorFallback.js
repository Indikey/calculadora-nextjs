import styles from '../styles/ErrorFallback.module.scss';

export default function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert" className={styles.errorContainer}>
      <p className={styles.errorTitle}>Erro! Por favor, tente recarregar a página</p>
      <p className={styles.errorValue}>Detalhes: {error.message}</p>
    </div>
  )
}