import type { AppType } from '@app/api';
import { hc } from 'hono/client';

export const apiClient = hc<AppType>('');
