interface UseLateBaseProps {
  enabled: boolean;
}

type LateStatus = 'loading' | 'success' | 'error';

interface UseLateBaseReturn<T> {
  data: Nullable<T>;
  status: LateStatus;
  error: unknown;
}
