import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header';
import DefaultData from "./utils/DefaultData";
import Card from './components/Card/Card';

function App() {
  const [data, setData] = useState(DefaultData);
  const [itemPerPages, setItemPerPages] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageNo, setPageNo] = useState(0);

  const GetPage = async (pageNo) => {
    const response = await fetch(`http://localhost:8080/api/tutorials?page=${pageNo}&size=${itemPerPages}`)
    if (response.ok) {
      const _data = await response.json();
      setPageNo(_data.currentPage);
      setData(_data);
    } else {
      console.error(response);
    }
  }

  const HandleItemSelect = (item) => {
    setSelectedItem(item);
  }
  const HandleCustomePage = (e) => {
    e.preventDefault();
    GetPage(pageNo)
  }
  const HandleSelectChange = (e) => {
    setItemPerPages(e.target.value);
  }
  useEffect(() => {
    GetPage(0);
  }, [itemPerPages])


  return (
    <>
      <Header />
      <div className='container'>
        <div className='py-3'>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <div className='row'>
          <div className='col-sm-12 col-md-8'>
            <h3 className='h3 mt-3 mb-2'>Tutorials List</h3>
            <div>
              <div className="">
                <label htmlFor="itemPerPages">Item per pages</label>
                <select className='ml-2' id="itemPerPages" value={itemPerPages} onChange={HandleSelectChange}>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                </select>
              </div>
            </div>
            <div className='py-3'>
              <button className='btn btn-outline-secondary mr-2' disabled={pageNo == 1} onClick={() => GetPage(0)}><span>&#11164;</span></button>
              {pageNo > 1 && <button className='btn btn-outline-secondary mr-2' onClick={() => GetPage(pageNo - 2)}>{pageNo - 2}</button>}
              {pageNo > 0 && <button className='btn btn-outline-secondary mr-2' onClick={() => GetPage(pageNo - 1)}>{pageNo - 1}</button>}
              <button className='btn btn-primary mr-2' disabled>{pageNo}</button>
              {pageNo < data.totalPages - 1 && <button className='btn btn-outline-secondary mr-2' onClick={() => GetPage(pageNo + 1)}>{pageNo + 1}</button>}
              {pageNo < data.totalPages - 2 && <button className='btn btn-outline-secondary mr-2' onClick={() => GetPage(pageNo + 2)}>{pageNo + 2}</button>}
              <button className='btn btn-outline-secondary mr-2' disabled={pageNo == data.totalPages} onClick={() => GetPage(data.totalPages - 1)}>
                <span>
                  &#11166;
                </span>
              </button>
            </div>
            <div className="list-group">
              {
                data.tutorials.map((item) => <Card key={item.id} item={item} setSelectedItem={HandleItemSelect} selectedItem={selectedItem} />)
              }
            </div>
          </div>
          <div className='col-sm-12 col-md-4'>
            {selectedItem &&
              <div>
                <h3 className='h3 mt-3 mb-2'>Tutorial</h3>
                <p className='mb-0'><b>Title:</b> {selectedItem.title}</p>
                <p className='mb-0'><b>Description:</b> {selectedItem.description}</p>
                <p className='mb-0'><b>Status:</b> {selectedItem.published ? 'Published' : 'Not Published'}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
