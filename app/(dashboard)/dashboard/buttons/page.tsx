import { UpdateButtonUI } from './_components/update-button-ui'
import ButtonPreview from './_components/button-preview'

const ButtonsPage = () => {
  return (
    <div className='container py-6'>
      <h1 className='mb-6 text-2xl font-bold'>Button Customization</h1>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Button customizer */}
        <div>
          <UpdateButtonUI />
        </div>

        {/* Button preview */}
        <div>
          <ButtonPreview />
        </div>
      </div>
    </div>
  )
}

export default ButtonsPage
