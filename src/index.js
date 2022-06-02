const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const req = require('express/lib/request');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')))

app.use(SortMiddleware);

app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
//http logger
app.use(morgan('combined'))
app.use(methodOverride('_method'))
// templates engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    sorttable: (fieldname, sort) => {
      const sortType = fieldname === sort.column ? sort.type : 'default'
      const icons = {
        default: 'oi oi-elevator',
        desc: 'oi oi-sort-ascending',
        asc: 'oi oi-sort-descending',
      }
      const types = {
        default: 'desc',
        desc: 'asc',
        asc: 'desc',
      }
      const icon = icons[sortType]
      const type = types[sortType]
      return `<a href="?_sort&column=${fieldname}&type=${type}">
      <span class="${icon}"></span>
      </a>`
    },
    sorttableHome: (fieldname, sort, byorder) => {
      const sortType = fieldname === sort.column ? sort.type : 'default'
      const icons = {
        default: 'oi oi-elevator',
        desc: 'oi oi-sort-ascending',
        asc: 'oi oi-sort-descending',
      }
      const types = {
        default: 'desc',
        desc: 'asc',
        asc: 'desc',
      }
      const icon = icons[sortType]
      const type = types[sortType]
      return `<a class="dropdown-item" href="?_sort&column=${fieldname}&type=${type}">
      ${byorder} <span class="${icon}"></span>
      </a>`
    }
  }
}));

app.set('view engine', 'hbs')
app.set('views',path.join(__dirname, 'recources','views'))

route(app)

app.listen(port, () => {
  console.log(`Web listening on port ${port}`)
})