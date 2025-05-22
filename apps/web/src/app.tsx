import { client } from '@app/api-client';
import { useEffect } from 'react';

export function App() {
  useEffect(() => {
    async function fetchData() {
      const res = await client.api.$get();
      const data = await res.json();
      console.log(data.message);
    }
    fetchData();
  }, []);

  return <div>app</div>;
}
