import { 
  DateTime 
} from "luxon"

export class Advert {
  constructor(id, data) {
    this.id = id
    this.created_at = DateTime.fromISO(data.created_at)
    this.description = data.description
    this.picture = data.picture
  }

  get created_at_label() {
    return this.created_at.toFormat('LLL dd yyyy h:mm a')
  }

  get view_url() {
    return `/adverts/${this.id}`
  }

  get update_url() {
    return `/adverts/${this.id}/update`
  }
}