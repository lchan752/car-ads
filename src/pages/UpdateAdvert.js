import 'pages/UpdateAdvert.scss'
import React from 'react'
import {
  db,
  storage,
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
  const [pictureURL, setPictureURL] = React.useState('')

  React.useEffect(() => {
    const advert_id = match.params.advert_id
    db.collection('adverts').doc(advert_id).get().then(doc => {
      if (doc.exists) {
        const data = doc.data()
        const options = { shouldValidate: true, shouldDirty: false }
        form.setValue('description', data.description, options)
        form.setValue('picture', data.picture, options)
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

  function onPictureUploaded(e) {
    const file = e.target.files[0]
    const path = `adverts/${file.name}`
    storage.ref(path).put(file).then(snap => {
      form.setValue('picture', path)
      snap.ref.getDownloadURL().then(url => setPictureURL(url))
    }).catch(err => setError(err))
  }

  return (
    <form className='updateadvert' onSubmit={form.handleSubmit(onUpdate)}>
      <h4 className='updateadvert__title'>Update Advert</h4>
      <div className='updateadvert__description'>
        <label>Description</label>
        <input type='text' name='description' {...form.register("description")}></input>
      </div>
      <div className='updateadvert__picture'>
        <label htmlFor='picture'>Upload Another Picture</label>
        <input type='file' accept="image/*" id="picture" onChange={onPictureUploaded}></input>
        <input type='hidden' name='picture' {...form.register("picture")}></input>
      </div>
      { pictureURL ? (
        <img src={pictureURL}></img>
      ) : null }
      {error ? <p className='updateadvert__error'>{error}</p> : null}
      <input
        type='submit'
        className='updateadvert__submit'
        value='Save'>
      </input>
    </form>
  )
}