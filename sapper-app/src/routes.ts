import { Router } from '@beyonk/sapper-rbac';


const routes = new Router()
    .unrestrict('/login.*')
    .restrict('/', ["screen"])
    .restrict('/screensaver', ["screen"])
    .restrict('/events', ["screen"])
    .restrict('/events/.*', ["screen"])
    .restrict('/new/.*', ["screen"])
    .restrict('/guests/.*', ["screen"])
    .restrict('/.*/.*/calender', ["screen"])
    .build()

export default routes