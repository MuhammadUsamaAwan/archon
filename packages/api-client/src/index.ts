import type { Routes } from '@app/api/routes';
import { hc } from 'hono/client';

export const apiClient = hc<Routes>('');
