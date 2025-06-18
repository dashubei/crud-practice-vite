type ErrorProps = {
  errorMessage?: string | null;
};
const Error = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div role="alert" aria-label={errorMessage}>
      {errorMessage}
    </div>
  );
};

export default Error;
