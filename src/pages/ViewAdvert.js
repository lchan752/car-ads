import 'pages/ViewAdvert.scss'
import React from 'react'
import {
  Advert
} from 'lib/dataclasses'
import {
  db,
  storage
} from 'lib/firebase'
import {
  useRouteMatch,
  Link,
} from 'react-router-dom'

export default function ViewAdvert() {
  const [advert, setAdvert] = React.useState()
  const [pictureURL, setPictureURL] = React.useState()
  const [error, setError] = React.useState('')
  const match = useRouteMatch()

  React.useEffect(() => {
    const advert_id = match.params.advert_id
    const unsubscribe = db.collection('adverts').doc(advert_id).onSnapshot(doc => {
      let advert = new Advert(doc.id, doc.data())
      setAdvert(advert)
      if (advert.picture) {
        storage.ref(advert.picture).getDownloadURL().then(url => setPictureURL(url))
      }
    }, err => setError(err.message))
    return unsubscribe
  }, [])

  return (
    <div className='viewadvert'>
      {advert ? (
        <dl className='viewadvert__card'>
          <dt>ID</dt>
          <dd>{advert?.id || 'N/A'}</dd>
          <dt>Created at</dt>
          <dd>{advert?.created_at_label || 'N/A'}</dd>
          <dt>Description</dt>
          <dd>{advert?.description || 'N/A'}</dd>
        </dl>
      ) : null}
      {pictureURL ? (
        <img className='viewadvert__picture' src={pictureURL}></img>
      ) : null}
      {advert ? (
        <Link to={advert.update_url} className='viewadvert__update'>Update Advert</Link>
      ) : null}
      {error ? <p className='viewadvert__error'>{error}</p> : null}
    </div>
  )
}