import axios from 'axios'

export const getAllCourses = async () => (
  await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_GATEWAY}/data`,
    headers: {
      'x-api-key': `${process.env.REACT_APP_COURSES_API_KEY}`
    },
    data: {
      action: 'GET_ALL',
      type: 'courses'
    }
  })
)