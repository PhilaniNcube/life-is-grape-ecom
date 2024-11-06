import { fetchQuery } from "convex/nextjs";
import CreateProducer from "./_components/create-producer";
import { api } from "@/convex/_generated/api";
import ProducerTable from "./_components/producer-table";

const Producers = async () => {

  const producers = await fetchQuery(api.producers.getProducers)

  return <div>
    <div className='flex w-full items-center justify-between'>
      <h2 className='text-xl font-semibold'>Producers</h2>
      <CreateProducer />
    </div>
    <div className="mt-2">

    <ProducerTable producers={producers} />
    </div>
  </div>;
};
export default Producers;
