import { Outlet } from 'react-router-dom';

import { Redirects } from '~/components/auth';

export default function App() {
  return (
    <main>
      <Redirects>
        <Outlet />
      </Redirects>
    </main>
  );
}
