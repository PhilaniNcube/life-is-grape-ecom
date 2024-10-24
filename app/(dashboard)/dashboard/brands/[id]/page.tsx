const BrandPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const {
    id
  } = params;

  return <div>BrandPage: {id}</div>
}
export default BrandPage
