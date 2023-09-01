import Layout from '../layouts/Layout';
// import useAuthMiddleware from '../hooks/useAuthMiddleware';
function Home() {
  // useAuthMiddleware();
  return (
    <Layout title='Dashboard'>
      <div className='p-5'>Indikasi geografis</div>
    </Layout>
  );
}
export default Home;
