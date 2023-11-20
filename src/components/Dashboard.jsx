import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Dashboard() {
  let userData = JSON.parse(sessionStorage.getItem('userData'));
  let [blogs, setBlogs] = useState([]);
  let navigate = useNavigate();
  let logout = useLogout();

  let getBlogs = async () => {
    try {
      let url = userData.role === 'admin' ? '/blogs' : '/blogs/user';
      let res = await AxiosService.get(url);
      if (res.status === 200) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const renderTooltip = (rejectedReason) => (
    <Tooltip id="tooltip">{rejectedReason ? rejectedReason : 'No rejected reason'}</Tooltip>
  );

  return (
    <div className='container-fluid'>
      <Table striped bordered hover className='dashboard'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((e, i) => (
            <tr key={e._id} onClick={() => navigate(`/blog/${e._id}`)} className='cursor-pointer'>
              <td>{i + 1}</td>
              <td>{e.title}</td>
              <td><img src={e.imageUrl} className='table-image' alt={e.title} /></td>
              <td>{new Date(e.createdAt).toLocaleString()}</td>
              <td>
                {e.status === 'rejected' ? (
                  <OverlayTrigger
                    placement='top'
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(e.reason)} 
                  >
                    <span style={{ cursor: 'pointer' }}>{e.status}</span>
                  </OverlayTrigger>
                ) : (
                  e.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;
