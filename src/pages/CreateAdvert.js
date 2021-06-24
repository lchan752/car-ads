import 'pages/CreateAdvert.scss'
import React from 'react'
import { 
  db, 
  storage 
} from 'lib/firebase'
import { 
  useForm 
} from 'react-hook-form'
import {
  DateTime
} from 'luxon'
import { 
  useHistory 
} from 'react-router-dom'

export default function CreateAdvert() {
  const form = useForm()
  const [error, setError] = React.useState('')
  const [pictureURL, setPictureURL] = React.useState('')
  const history = useHistory()

  function onCreate(data) {
    db.collection('adverts').add({
      created_at: DateTime.now().toISO(),
      description: data.description,
      picture: data.picture,
    }).then(doc => {
      let url = `/adverts/${doc.id}`
      history.push(url)
    }).catch(err => setError(err.message))
  }

  function onPictureUploaded(e) {
    const file = e.target.files[0]
    const path = `adverts/${file.name}`
    storage.ref(path).put(file).then(snap => {
      form.setValue('picture', path)
      snap.ref.getDownloadURL().then(url => setPictureURL(url))
    }).catch(err => setError(err.message))
  }
  
  return (
    <form className='createadvert' onSubmit={form.handleSubmit(onCreate)}>
      <h4 className='createadvert__title'>Create Advert</h4>
      <div className='createadvert__description'>
        <label>Description</label>
        <input type='text' name='description' {...form.register("description")}></input>
      </div>
      <div className='createadvert__picture'>
        <label htmlFor='picture'>Upload Picture</label>
        <input type='file' accept="image/*" id="picture" onChange={onPictureUploaded}></input>
        <input type='hidden' name='picture' {...form.register("picture")}></input>
      </div>
      { pictureURL ? (
        <img src={pictureURL}></img>
      ) : null }
      {error ? <p className='createadvert__error'>{error}</p> : null}
      <input 
        type='submit' 
        className='createadvert__submit' 
        value='Save'>
      </input>
    </form>
  )
}