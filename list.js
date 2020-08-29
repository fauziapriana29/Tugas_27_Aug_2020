document.getElementById("addList").addEventListener("submit", (event) => {
    event.preventDefault();

    const date = document.getElementById("inputDate").value;
    const time = document.getElementById("inputTime").value;
    const list = document.getElementById("inputList").value;

    const data = {
        date,
        time,
        list,
    }
    // console.log(data)
    axios.post("http://localhost:3000/list", data).then((respone) => {
        console.log("berhasil ditambah" + respone)
        window.location.reload(true)
    })
    .catch((error) => {
        console.log("data gagal ditambah" + error)
    })
})




let data = []

axios.get("http://localhost:3000/list").then((respone) => {
    const listData = document.getElementById('listData')
    data=respone.data

    data.forEach((data,id) => {
        const {date, time, list} = data

        const tableHtml = `<tr>
        <th scope="row">${id + 1} .</th>
        <td>${date}</td>
        <td>${time}</td>
        <td class="isilist" id="isiList${id}">${list}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteList(${data.id})" type="submit" title="Delete list">
                <i class="far fa-trash-alt fa-lg"></i>
            </button> &nbsp;
            <button class="btn btn-secondary" onclick="updateList(${data.id})" title="Edit list">
                <i class="fas fa-pencil-alt fa-lg"></i>
            </button>
        </td>
      </tr>`

      listData.innerHTML += tableHtml
      
    })
})
.catch((error) => {
    console.log(error)
})

// const checkList = (id) => {
//     const findData = data.find(data => {
//         return data.id === id
//     })
//     if (findData) {
//         const isiList = document.getElementById(`isiList${id}`)
//         $(isiList).addClass('lineThrough')
//     }
    
// }

const deleteList = (id) => {
    let confirm = window.confirm("Are You sure to Delete this List ?")
    if(confirm == true){
        axios.delete(`http://localhost:3000/list/${id}`).then((respone) => {
            // alert("Data Telah Di Hapus")
            window.location.reload(true)
        })
        .catch((error) => {
            console.log("Delete Error")
        })
    }else {
        alert("Cancel to Delete this List")
    }
}

const updateList = (id) => {
    const findData = data.find(data => {
        return data.id === id
    })

    if(findData) {
        const date = window.prompt("Change Date : yyyy-mm-dd", findData.date)
        const time = window.prompt("Change Time : hh:mm", findData.time)
        const list = window.prompt("Change Your List", findData.list)

        const data = {
            date,
            time,
            list,
        }

        axios.put(`http://localhost:3000/list/${id}`, data)
        window.location.reload(true)
    }
}