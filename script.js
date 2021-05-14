const url =
  'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=180&date=15-05-2021'

// const sendGetRequest = async () => {
//   try {
//     const resp = await axios.get(url)
//     const data = resp.data.centers

//     console.log(data)
//     for (var i = 0; i < data.length; i++) {
//       for (var j = 0; j < data[i].sessions.length; j++) {
//         if (data[i].sessions[j].min_age_limit == 18) {
//           console.log(data[i].sessions[j].available_capacity)
//           console.log(data[i].sessions[j].min_age_limit)
//         }
//       }
//     }
//     setTimeout('location.reload();', 1500000)
//   } catch (err) {
//     console.error(err)
//   }
// }
function submitHandler(e) {
  // e.preventDefault()
  let name = document.querySelector('.name').value
  let show = function () {
    const noti = new Notification(`Hey ${name}`, {
      body: 'I will notify you when seat is available',
    })
  }
  show()
}

function showNotification(name, capacity) {
  const notification = new Notification('Seat is available', {
    body: `Hey mate, check asap ${capacity} seats are available at ${name}`,
  })
}

function getCenters() {
  console.log(Notification.permission)
  if (Notification.permission === 'granted') {
    console.log('granted')
    // showNotification()
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        showNotification()
      }
    })
  }
  try {
    axios
      .get(url)
      .then(function (resp) {
        const data = resp.data.centers
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].sessions.length; j++) {
            if (
              data[i].sessions[j].min_age_limit == 18 &&
              data[i].sessions[j].available_capacity > 0
            ) {
              showNotification(
                data[i].name,
                data[i].sessions[j].available_capacity
              )
              console.log(
                `${data[i].sessions[j].available_capacity} of seats is available`
              )
              console.log(data[i].name + ' name')
              console.log(
                data[i].sessions[j].available_capacity + ' available capacity'
              )
              console.log(data[i].sessions[j].min_age_limit + ' age')
            }
          }
        }
        setTimeout('location.reload();', 8000)
      })
      .catch(function (error) {
        console.log('In the error ' + error)
        setTimeout('location.reload();', 8000)
      })
  } catch (error) {
    console.log(error)
  }
}

// sendGetRequest()
getCenters()
