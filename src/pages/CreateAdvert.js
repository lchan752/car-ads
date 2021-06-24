import 'pages/CreateAdvert.scss'
import React from 'react'
import { 
  db 
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
  const history = useHistory()

  function onCreate(data) {
    db.collection('adverts').add({
      created_at: DateTime.now().toISO(),
      description: data.description,
    }).then(doc => {
      let url = `/adverts/${doc.id}`
      history.push(url)
    }).catch(err => setError(err))
  }
  
  return (
    <form className='createadvert' onSubmit={form.handleSubmit(onCreate)}>
      <h4 className='createadvert__title'>Create Advert</h4>
      <div className='createadvert__description'>
        <label>Description</label>
        <input type='text' name='description' {...form.register("description")}></input>
      </div>
      {error ? <p className='createadvert__error'>{error}</p> : null}
      <input 
        type='submit' 
        className='createadvert__submit' 
        value='Save'>
      </input>
    </form>
  )
}