const WineryPage = async (props:{params: Promise<{id:string}>}) => {
  const params = await props.params;

  const {
    id
  } = params;

  return <div>WineryPage:{id}</div>;
};
export default WineryPage;
