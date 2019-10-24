import Moment from 'moment'

function formatterDate (row, column, cellValue) {
  return Moment(cellValue).format('YYYY-MM-DD hh:mm')
}

export default {
  formatterDate
}
