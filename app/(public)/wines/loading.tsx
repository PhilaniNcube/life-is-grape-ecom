const Loading = () => {
  return (
    <div className='ml-3 grid grid-cols-1 gap-6 has-[[data-pending]]:animate-pulse sm:grid-cols-2 md:grid-cols-3'>
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
    </div>
  )
}
export default Loading
