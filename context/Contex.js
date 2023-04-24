import React, { useEffect, useState } from "react"

export const BlogContext = React.createContext()

export const BlogContextProvider = ({children}) => {

  const [blogData, setBlogData] = useState([])
  const [page, setPage] = useState(2)
  const [totalCount, setTotalCount] = useState(0)

  // Bu fonksiyon ile veri çekilerek kullanıcıya uygulamayı ilk başlattığı anda gösterilen veriler listeleniyor.
  // This function fetches data and lists the data displayed to the user when the application is initially launched.
  const fetchData = () => {
    fetch(
    `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${1}&count=10`
    )
    .then(res => res.json())
    .then(data => {
      setBlogData(data.result)
      setTotalCount(data.totalCount)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Bu değişken dinamik pagination işleminde maximum döngü sayısını belirtmek için kullanılıyor.
  // This variable is used to specify the maximum loop count in dynamic pagination process.
  // API'da verilen "totalCount" değeri "totalCount" state'i ile kaydedilerek elde ediliyor.
  // The given "totalCount" value in the API is obtained by storing it in the "totalCount" state.
  let maxPage = Math.ceil(totalCount/10)

  // Bu fonksiyon, kullanıcı listenin ortalarına geldiğinde tetikleniyor ve ikinci sayfadan ("page" state) itibaren veri çekmeye başlanıyor.
  // This function is triggered when the user reaches the middle of the list, and starts fetching data from the second page ("page" state).
  // "maxPage" değerine kadar her bir tetiklemede değeri 1 arttırıyor ve her veri çekildiğinde içeriklerin bulunduğu state güncelleniyor.
  // It increments the value by 1 on each trigger until it reaches the "maxPage" value, and updates the state containing the contents each time data is fetched.
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)

    if(maxPage >= page) {
      fetch(
        `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${page}&count=10`
      )
      .then(res => res.json())
      .then(data => {
        setBlogData(prevData => [...prevData, ...data.result])
      })
    } 
  }

  return(
    <BlogContext.Provider value={{blogData, fetchData, loadMore, setPage}}>
      {children}
    </BlogContext.Provider>
  )
}