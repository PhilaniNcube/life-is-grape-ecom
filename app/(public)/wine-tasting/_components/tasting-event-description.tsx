import Image from "next/image";

const TastingEventDescription = () => {
  return (
    <div className='w-full'>
      <h2 className='text-2xl font-bold text-gray-900'>How It Works</h2>
      <ol className='max-w-[60ch] list-decimal text-sm'>
        <li>
          You can choose the type of tasting experience you would like from our
          list of experiences.
        </li>
        <li>Each booking requires a minimum of 10 guests</li>
        <li>
          Once you have chosen your experience and made your booking, we will
          come to your chosen premises with selected wines/spirits/cocktails, as
          well a selection of snacks
        </li>
        <li>
          During the tasting experience we will provide some background &
          education on the selection in front of you.
        </li>
      </ol>
      <Image
        src='https://quiet-caterpillar-834.convex.cloud/api/storage/3b331893-c2d0-46dc-aaf6-b5fdc8246c89'
        alt='Tasting Event'
        width={400}
        height={600}
        className='h-[500px] mt-6 w-full object-cover'
      />
    </div>
  )
};
export default TastingEventDescription;
