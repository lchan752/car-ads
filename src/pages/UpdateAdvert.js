import 'pages/UpdateAdvert.scss'
import React from 'react'
import {
  db
} from 'lib/firebase'
import {
  useForm
} from 'react-hook-form'
import {
  useHistory,
  useRouteMatch
} from 'react-router-dom'

export default function UpdateAdvert() {
  const form = useForm()
  const match = useRouteMatch()
  const history = useHistory()
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const advert_id = match.params.advert_id
    db.collection('adverts').doc(advert_id).get().then(doc => {
      if (doc.exists) {
        const data = doc.data()
        const options = { shouldValidate: true, shouldDirty: false }
        form.setValue('description', data.description, options)
      } else {
        let error_message = `Advert with ID=${advert_id} does not exists`
        setError(error_message)
      }
    }).catch(err => setError(err))
  }, [])

  function onUpdate(data) {
    const advert_id = match.params.advert_id
    db.collection('adverts').doc(advert_id).update(data).then(() => {
      let url = `/adverts/${advert_id}`
      history.push(url)
    }).catch(err => setError(err))
  }

  return (
    <form className='updateadvert' onSubmit={form.handleSubmit(onUpdate)}>
      <h4 className='updateadvert__title'>Update Advert</h4>
      <div className='updateadvert__description'>
        <label>Description</label>
        <input type='text' name='description' {...form.register("description")}></input>
      </div>
      {error ? <p className='updateadvert__error'>{error}</p> : null}
      <input
        type='submit'
        className='updateadvert__submit'
        value='Save'>
      </input>
    </form>
  )
}