import { Header } from './header';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <section className="mt-36 mb-12 px-16 md:px-32 lg:px-56 xl:px-64">
        {children}
      </section>
    </>
  );
};
